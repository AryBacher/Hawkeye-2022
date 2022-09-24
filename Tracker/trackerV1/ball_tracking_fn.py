from collections import deque
from imutils.video import VideoStream
import numpy as np
import cv2
import imutils

def ball_tracking(frame, type):
	# Rango de deteccion de verdes
	greenLower = np.array([29, 86, 110])
	greenUpper = np.array([64, 255, 255])

	# Se multiplica el tamaño del frame para un mayor análisis
	# Para esto se fija si es el frame normal o en perspectiva
	resizer = 2 if type == "normal" else 10

	# Se agranda la imagen para mayor efectividad
	frame = imutils.resize(frame, width = frame.shape[1] * resizer, height = frame.shape[0] * resizer)

	# Filtrado a verde (prueba)
	hsv_crudo = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
	hsv_crudo_res = imutils.resize(hsv_crudo, width=1000)
	cv2.imshow('HSV', hsv_crudo_res)
	mask_crudo = cv2.inRange(hsv_crudo, greenLower, greenUpper)
	mask_crudo_res = imutils.resize(mask_crudo, width=1000)
	cv2.imshow('Verde Crudo', mask_crudo_res)

	# Se le pasa un blur
	blurred = cv2.GaussianBlur(frame, (11, 11), 0)
	#blurred = cv2.dilate(frame, None, iterations=2)
	hsv = cv2.cvtColor(blurred, cv2.COLOR_BGR2HSV)

	# Filtra los tonos verdes de la imagen
	mask = cv2.inRange(hsv, greenLower, greenUpper)
	cv2.imshow("mask1", mask)
	mask = cv2.erode(mask, None, iterations=2)
	mask = cv2.dilate(mask, None, iterations=2)
	#mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)   #morphology close operation for remove small noise point
	cv2.imshow("mask2", mask)

	# Toma todos los contornos de la imagen
	cnts = cv2.findContours(mask.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
	cnts = imutils.grab_contours(cnts)

	center = None

	if len(cnts) > 0:
		# Busca el contorno más grande y encuentra su posición (x, y)
		c = max(cnts, key=cv2.contourArea)
		((x, y), radius) = cv2.minEnclosingCircle(c)
		M = cv2.moments(c)
		center = (int(int(M["m10"] / M["m00"]) / resizer), int(int(M["m01"] / M["m00"]) / resizer))

	#print("CENTRO", center)

	retorno = [center, cnts]

	return retorno

def tp_fix(contornos, pre_centro, count):
	cnts_pts = []
	for contorno in contornos:
		((x, y), radius) = cv2.minEnclosingCircle(contorno)
		if x - pre_centro[0] > 100 or pre_centro[0] - x > 100 or y - pre_centro[1] > 100 or pre_centro[1] - y > 100 and count <= 0.5:
			continue
		cnts_pts.append(contorno)
	if cnts_pts != []:
		return cualEstaMasCerca(pre_centro, cnts_pts)
	else: print("No se encontró la pelota")


def cualEstaMasCerca(punto, lista):
	suma = []
	suma2 = []
	for i in lista:
		(xCenter, yCenter), radius = cv2.minEnclosingCircle(i)
		x = int(xCenter) - int(punto[0]) 
		y = int(yCenter) - int(punto[1])

		if x < 0:
			x *= -1
		
		if y < 0:
			y *= -1 
		
		suma.append(x + y)
		suma2.append(i)
	return suma2[suma.index(min(suma))]