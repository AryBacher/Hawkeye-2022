from collections import deque
from imutils.video import VideoStream
import numpy as np
import cv2
import imutils

def ball_tracking(frame):
	# Rango de deteccion de verdes
	greenLower = np.array([29, 86, 110])
	greenUpper = np.array([64, 255, 255])

	resizer = 2

	# Se agranda la imagen para mayor efectividad
	frame = imutils.resize(frame, width = frame.shape[1] * resizer, height = frame.shape[0] * resizer)
	#print("RESOLUCION", frame.shape)
	

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
	cnts = cv2.findContours(mask.copy(), cv2.RETR_EXTERNAL,
		cv2.CHAIN_APPROX_SIMPLE)
	cnts = imutils.grab_contours(cnts)

	center = None

	if len(cnts) > 0:
		# Busca el contorno más grande y encuentra su posición (x, y)
		c = max(cnts, key=cv2.contourArea)
		((x, y), radius) = cv2.minEnclosingCircle(c)
		M = cv2.moments(c)
		center = (int(int(M["m10"] / M["m00"]) / resizer), int(int(M["m01"] / M["m00"]) / resizer))
		

		# Sigue si el contorno tiene cierto tamaño
		# if radius > 0:
			# Dibuja el círculo en la pelota
			# cv2.circle(frame, (int(x), int(y)), int(radius), (0, 255, 255), 2)
			# cv2.circle(frame, center, 5, (0, 0, 255), -1)
	print("CENTRO", center)

	return center