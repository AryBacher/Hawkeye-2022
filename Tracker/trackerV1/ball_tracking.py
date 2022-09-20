from collections import deque
from cv2 import minEnclosingCircle
from imutils.video import VideoStream
import numpy as np
import argparse
import cv2
import imutils
import time

#center = None

def tp_fix(contornos, pre_centro):
	cnts_pts = []
	for contorno in contornos:
		#((x, y), radius) = minEnclosingCircle(contorno)
		if x - pre_centro[0] > 100 or pre_centro[0] - x > 100 or y - pre_centro[1] > 100 or pre_centro[1] - y > 100 and count <= 0.5:
			continue
		#cnts_pts.append((int(x), int(y), int(radius)))
		cnts_pts.append(contorno)
	if cnts_pts != []:
		print("CONTORNOS: ", cnts_pts) 
		return cualEstaMasCerca(pre_centro, cnts_pts)
	else: print("No se encontró la pelota")


def cualEstaMasCerca(punto, lista):
	suma = []
	suma2 = []
	for i in lista:
		print("IIIIII: ", i)
		x = int(i[0]) - int(punto[0])
		y = int(i[1]) - int(punto[1])

		if x < 0:
			x *= -1
		
		if y < 0:
			y *= -1 
		
		suma.append(x + y)
		suma2.append((i[0], i[1], i[2]))
		#a = suma.index(min(suma))
	#return suma2[a]
	return suma2[suma.index(min(suma))]

# def detectar_si_esta_lejos(lista, center):
# 	contornos = []
# 	print("la funcion corre")
# 	print(center)
# 	for pos in lista:
# 		if not (pos[0] > center[0] + 100).any() or not (pos[0] < center[0] - 100).any() or not (pos[1] > center[1] + 100).any() or not (pos[1] < center[1] - 100).any():
# 			print("entra al if")
# 			contornos.append([pos[0], pos[1]])
# 	return contornos

# Argumentos del programa
ap = argparse.ArgumentParser()
ap.add_argument("-v", "--video",
	help="path to the (optional) video file")
ap.add_argument("-b", "--buffer", type=int, default=64,
	help="max buffer size")
args = vars(ap.parse_args())

# Rango de deteccion de verdes
greenLower = np.array([29, 86, 110])
greenUpper = np.array([64, 255, 255])

#BGR_prueba = np.array([[[0,255,0]]], dtype=np.uint8)
#x = cv2.cvtColor(greenUpper, cv2.COLOR_HSV2BGR)
#print(x)

pts = deque(maxlen=args["buffer"])
preCentro = None
primeraVez = True

#kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(5,5))  #ellipse kernel

# Toma la cámara si no recibe video
if not args.get("video", False):
	vs = VideoStream(src=0).start()

# Toma video en caso de haber
else:
	vs = cv2.VideoCapture(args["video"])
	
	# Fps del video
	fps = int(vs.get(cv2.CAP_PROP_FPS))
	print(fps)

time.sleep(2.0)

count = 0

while True:
	# Agarra el frame actual
	frame = vs.read()
	frame = frame[1] if args.get("video", False) else frame

	# Verifica si termina el video
	if frame is None:
		break

	anchoOG = frame.shape[1]
	altoOG = frame.shape[0]

	estaCercaX = anchoOG * 15/100
	estaCercaY = altoOG * 15/100

	#frame = imutils.resize(frame, width=600)
	punto = [100, 300]
	lista = [[105, 1250], [900, 100], [800, 500], [100, 100]]

	#print("fn: ", cualEstaMasCerca(punto, lista))

	# Cámara lenta para mayor análisis
	#cv2.waitKey(100)
	
	# Verde crudo
	hsv_prueba = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
	cv2.imshow('prueba', hsv_prueba)
	mask_prueba = cv2.inRange(hsv_prueba, greenLower, greenUpper) 
	cv2.imshow('mask1', mask_prueba)

	blurred = cv2.GaussianBlur(frame, (11, 11), 0)
	#blurred = cv2.dilate(frame, None, iterations=2)
	hsv = cv2.cvtColor(blurred, cv2.COLOR_BGR2HSV)

	# Filtra los tonos verdes de la imagen
	mask = cv2.inRange(hsv, greenLower, greenUpper)
	cv2.imshow("mask2", mask)
	mask = cv2.erode(mask, None, iterations=2)
	mask = cv2.dilate(mask, None, iterations=2)
	#mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)   #morphology close operation for remove small noise point
	cv2.imshow("mask3", mask)

	# Toma todos los contornos de la imagen
	cnts = cv2.findContours(mask.copy(), cv2.RETR_EXTERNAL,
		cv2.CHAIN_APPROX_SIMPLE)
	cnts = imutils.grab_contours(cnts)

	center = None

	if len(cnts) > 0:
		# Busca el contorno más grande y encuentra su posición (x, y)

		count = 0

		if primeraVez:
			c = max(cnts, key=cv2.contourArea)
			((x, y), radius) = cv2.minEnclosingCircle(c)
			print("El verdadero C: ", c)
			M = cv2.moments(c)
			center = (int(M["m10"] / M["m00"]), int(M["m01"] / M["m00"]))
			primeraVez = False
			preCentro = center

		else:
			# if pre_center is not None:
			# 	c = tp_fix(cnts, center)
			# 	M = cv2.moments(c)
			# 	center = (int(M["m10"] / M["m00"]), int(M["m01"] / M["m00"]))
			# else: 
			# 	primeraVez = True
			# 	pre_center = None
			
			c = tp_fix(cnts, preCentro)

			if c is not None:
				#((x, y), radius) = cv2.minEnclosingCircle(c)
				#c2 = []
				print("Circle: ", c)
				#c2.append(((c[0], c[1]), c[2]))
				#c = c2
				M = cv2.moments(c)
				print("M: ",M)
				center = (int(M["m10"] / M["m00"]), int(M["m01"] / M["m00"]))
				preCentro = center
			
			else:
				primeraVez = True
				count += 1/fps
				preCentro = None
		
		#center = (int(x), int(y))
		#print("PELOTA", center)
		
		# Sigue si el contorno tiene cierto tamaño
		if radius > 0:
			# Dibuja el círculo en la pelota
			cv2.circle(frame, (int(x), int(y)), int(radius), (0, 255, 255), 2)
			cv2.circle(frame, center, 5, (0, 0, 255), -1)

	else:
		primeraVez = True
		count += 1/fps
		preCentro = None
 
	# Actualiza los puntos para trazar la trayectoria
	print("Deque: ", pts)
	pts.appendleft(center)
	#preCentro.appendleft(center)

	for i in range(1, len(pts)):
		# Ignora los puntos de trayectoria inexistentes
		if pts[i - 1] is None or pts[i] is None:
			continue

		# Traza la trayectoria
		thickness = int(np.sqrt(args["buffer"] / float(i + 1)) * 2.5)
		cv2.line(frame, pts[i - 1], pts[i], (0, 0, 255), thickness)

	#print("DEQUEEEE: ", pts)
	# Muestra el frame
	cv2.imshow("V1", frame)
	
	# Terminar la ejecución si se presiona la "q"
	key = cv2.waitKey(1) & 0xFF
	if key == ord("q"):
		break
	

if not args.get("video", False):
	vs.stop()

else:
	vs.release()

cv2.destroyAllWindows()