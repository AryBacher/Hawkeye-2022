import sys
#for x in range(10000):
#    sys.stdout.flush()

print('welcome to', str(sys.argv[1]))




from collections import deque
from cv2 import circle, minEnclosingCircle
from imutils.video import VideoStream
import numpy as np
import argparse
import cv2
import imutils
import time

resizer = 2

def tp_fix(contornos, pre_centro, count):
	cnts_pts = []
	for contorno in contornos:
		((x, y), radius) = cv2.minEnclosingCircle(contorno)
		if x - pre_centro[0] > 100 * resizer or pre_centro[0] - x > 100 * resizer or y - pre_centro[1] > 100 * resizer or pre_centro[1] - y > 100 * resizer and count <= 0.5:
			continue
		cnts_pts.append(contorno)
	if cnts_pts != []:
		return cualEstaMasCerca(pre_centro, cnts_pts)
	else: print("No se encontró la pelotaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

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

def pica (centro1, centro2, centro3):
	gerardPique = True
	a = centro1 - centro2
	b = centro2 - centro3
	if a <= 0 and b >= 0 or a >= 0 and b <= 0:
		gerardPique = False
	return gerardPique

def centroQuieto(list_center):
	sumaX = 0
	sumaY = 0
	centrosCerca = True
	for i in list_center:
		if centrosCerca == False: break
		sumaX += i[0]
		sumaY += i[1]
		for l in list_center:
			if i[0] - l[0] >= -20 and i[0] - l[0] <= 20:
				centrosCerca = True
			else:
				centrosCerca = False
				break

			if centrosCerca and i[1] - l[1] >= -20 and i[1] - l[1] <= 20:
				centrosCerca = True
			else:
				centrosCerca = False
				break
	
	if centrosCerca:
		centrosIgnorar.append((sumaX / 10, sumaY / 10))
		return True
	return False

def ignorarQuieto(cnts):
	new_cnts = []
	Ignorar = False
	print("Puntos a ignorar", centrosIgnorar)
	for cnt in cnts:
		(x, y), radius = minEnclosingCircle(cnt)
		print("Circulo", (x, y))
		for i in centrosIgnorar:
			if x - i[0] >= -20 and x - i[0] <= 20:
				Ignorar = True
			else:
				Ignorar = False

			if Ignorar and y - i[1] >= -20 and y - i[1] <= 20:
				break
			
		if Ignorar == False: new_cnts.append(cnt)
	
	for i in new_cnts:
		print("Nueva lista", minEnclosingCircle(i))
	return new_cnts

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
greenLower = np.array([29, 50, 110])
#greenLower = np.array([29, 60, 110])

#BGR_prueba = np.array([[[0,255,0]]], dtype=np.uint8)
#x = cv2.cvtColor(greenUpper, cv2.COLOR_HSV2BGR)

pts = deque(maxlen=args["buffer"])
preCentro = None
primeraVez = True

#kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(5,5))  #ellipse kernel

# Toma la cámara si no recibe video
if not args.get("video", False):
	vs = cv2.VideoCapture(0)

# Toma video en caso de haber
else:
	vs = cv2.VideoCapture(args["video"])
	#vs = cv2.VideoCapture("y2mate.com - The Ultimate Clutch  shorts_1080pFHR.mp4")

# Fps del video
fps = int(vs.get(cv2.CAP_PROP_FPS))
print(fps)

time.sleep(2.0)

topLeftX = 749
topLeftY = 253
topRightX = 1095
topRightY = 252
bottomLeftX = 206
bottomLeftY = 797
bottomRightX = 1518
bottomRightY = 785

# Puntos de esquinas Alcaraz vs Fucsovics: 366, 196, 608, 198, 78, 378, 724, 398
# Puntos de esquinas TennisBrothers: 311, 106, 456, 105, 89, 331, 628, 326
# Puntos de esquinas TennisBrothers 1080: 749, 253, 1095, 252, 206, 797, 1518, 785

count = 0
count2 = 0
countMovimiento = 0
centrosMovimiento = deque(maxlen=10)
centrosIgnorar = []
pique = deque(maxlen=60)
pique2 = deque(maxlen=60)
pique3 = deque(maxlen=3)

#listaContornos = []

#prevCircle = None
#dist = lambda x1,y1,x2,y2: (x1-x2)**2+(y1-y2)**2

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

	frame = imutils.resize(frame, anchoOG * resizer, altoOG * resizer)

	pts1 = np.float32([[topLeftX, topLeftY],       [topRightX, topRightY],
                    [bottomLeftX, bottomLeftY], [bottomRightX, bottomRightY]])
	pts2 = np.float32([[0, 0], [164, 0], [0, 474], [164, 474]])
	
	matrix = cv2.getPerspectiveTransform(pts1, pts2)
	result = cv2.warpPerspective(frame, matrix, (164, 474))

	# Cámara lenta para mayor análisis
	#cv2.waitKey(100)
	
	# Verde crudo
	hsv_prueba = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
	#cv2.imshow('prueba', hsv_prueba)
	mask_prueba = cv2.inRange(hsv_prueba, greenLower, greenUpper) 
	#cv2.imshow('mask1', mask_prueba)

	blurred = cv2.GaussianBlur(frame, (11, 11), 0)
	#blurred = cv2.dilate(frame, None, iterations=2)
	hsv = cv2.cvtColor(blurred, cv2.COLOR_BGR2HSV)

	# Filtra los tonos verdes de la imagen
	mask = cv2.inRange(hsv, greenLower, greenUpper)
	mask = cv2.erode(mask, None, iterations=2)
	mask = cv2.dilate(mask, None, iterations=2)
	cv2.imshow("mask3", mask)

	cnts = cv2.findContours(mask.copy(), cv2.RETR_EXTERNAL,
		cv2.CHAIN_APPROX_SIMPLE)
	cnts = imutils.grab_contours(cnts)

	center = None		


	if len(cnts) > 0:

		if primeraVez:
			c = max(cnts, key=cv2.contourArea)
			((x, y), radius) = cv2.minEnclosingCircle(c)
			M = cv2.moments(c)
			center = (int(M["m10"] / M["m00"]), int(M["m01"] / M["m00"]))
			primeraVez = False
			preCentro = center
			count = 0
			count2 = 0
			pique3.appendleft(center[1])
			centrosMovimiento.clear()
			centrosMovimiento.appendleft(center)

		else:

			c = tp_fix(cnts, preCentro, count)

			if c is not None:
				((x, y), radius) = cv2.minEnclosingCircle(c)
				M = cv2.moments(c)
				center = (int(M["m10"] / M["m00"]), int(M["m01"] / M["m00"]))
				preCentro = center
				count2 += count
				count = 0
				pique3.appendleft(center[1])
				centrosMovimiento.appendleft(center)
				if len(pique3) == 3 and count2 <= 0.1:
					pica(pique3[2], pique3[1], pique3[0])
					count2 = 0				
			
			else:
				print("COUNT", count)
				if count >= 0.3:
					primeraVez = True
					preCentro = None
				count += 1/fps
				count2 = 0
				
		if radius > 0 and primeraVez or c is not None:
		
			cv2.circle(frame, (int(x), int(y)), int(radius), (0, 255, 255), 2)
			cv2.circle(frame, center, 5, (0, 0, 255), -1)

	else:
		print("COUNT", count)
		if count >= 0.3:
			primeraVez = True
			preCentro = None
		count += 1/fps
		count2 = 0

	pts.appendleft(center)

	for i in range(1, len(pts)):
		if pts[i - 1] is None or pts[i] is None:
			continue

		thickness = int(np.sqrt(args["buffer"] / float(i + 1)) * 2.5)
		cv2.line(frame, pts[i - 1], pts[i], (0, 0, 255), thickness)
	
	bajando = False

	if (center is not None):
		print(center[1])
		pique.appendleft(center[1])
		
		if (len(pique) >= 2):
			if (pique[0] - pique[1] > 0):
				bajando = True
		pique2.appendleft(bajando)
		print(bajando)

	if (len(pique2) >= 2):
		if pique2[0] == False and pique2[1] == True:
			print("Gerard")
			frame = cv2.putText(frame, 'Gerard', preCentro, cv2.FONT_HERSHEY_COMPLEX, 3, (0, 0, 255), 0, 2)

	frame = imutils.resize(frame, anchoOG, altoOG)

	cv2.imshow("V1", frame)
	cv2.imshow("Result", result)
	
	key = cv2.waitKey(1) & 0xFF
	if key == ord("q"):
		break
	countMovimiento += 1

if not args.get("video", False):
	vs.stop()

else:
	vs.release()

cv2.destroyAllWindows()