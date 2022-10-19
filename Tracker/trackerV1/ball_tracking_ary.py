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
		if x - pre_centro[0][0] > 100 * resizer or pre_centro[0][0] - x > 100 * resizer or y - pre_centro[0][1] > 101 * resizer or pre_centro[0][1] - y > 101 * resizer and count <= 0.5:
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
		difEnX = int(xCenter) - int(punto[0][0])
		difEnY = int(yCenter) - int(punto[0][1])
		difRadio = int(radius) - int(punto[1])

		if difEnX < 0:
			difEnX *= -1
		
		if difEnY < 0:
			difEnY *= -1

		if difRadio < 0:
			difRadio *= -1
		
		suma.append(difEnX + difEnY + difRadio)
		suma2.append(i)
	return suma2[suma.index(min(suma))]

def pica (centro1, centro2, centro3):
	gerardPique = True
	a = centro1 - centro2
	b = centro2 - centro3
	if a <= 0 and b >= 0 or a >= 0 and b <= 0:
		gerardPique = False
	return gerardPique

# def centroQuieto(list_center):
# 	sumaX = 0
# 	sumaY = 0
# 	centrosCerca = True
# 	for i in list_center:
# 		if centrosCerca == False: break
# 		sumaX += i[0]
# 		sumaY += i[1]
# 		for l in list_center:
# 			if i[0] - l[0] >= -20 and i[0] - l[0] <= 20:
# 				centrosCerca = True
# 			else:
# 				centrosCerca = False
# 				break

# 			if centrosCerca and i[1] - l[1] >= -20 and i[1] - l[1] <= 20:
# 				centrosCerca = True
# 			else:
# 				centrosCerca = False
# 				break
	
# 	if centrosCerca:
# 		centrosIgnorar.append((sumaX / 10, sumaY / 10))
# 		return True
# 	return False
	
def contornosQuietos(cnts):
	centrosCerca = False
	#print("Length Contornos", len(cnts))
	for i in cnts:
		count = 0
		(x, y), radius = cv2.minEnclosingCircle(i)
		x, y, radius = int(x), int(y), int(radius)
		#print("Contornos en el frame", (x, y, radius))
		for l in todosContornos:
			for j in l:
				if x - j[0][0] >= -10 and x - j[0][0] <= 10 and y - j[0][1] >= -10 and y - j[0][1] <= 10:
					centrosCerca = True
				else:
					centrosCerca = False
					break
			if centrosCerca:
				#print("Estoy Cerca, Todos contornos Count:", todosContornos[count])
				todosContornos[count].append([(x, y, radius)])
				#print("Después de apendearme, estoy así", todosContornos[count])
				break
			count += 1
		if not centrosCerca:
			#print("Estoy Lejos")
			todosContornos.append([[(x, y, radius)]])

	for l in todosContornos:
		existe = False
		if (len(l) >= 10):
			promedioIgnorarX = 0
			promedioIgnorarY = 0
			for j in l:
				promedioIgnorarX += j[0][0]
				promedioIgnorarY += j[0][1]
			promedioIgnorarX /= len(l)
			promedioIgnorarY /= len(l)
			promedioIgnorarX, promedioIgnorarY = int(np.rint(promedioIgnorarX)), int(np.rint(promedioIgnorarY))
			if (len(contornosIgnorar) == 0): contornosIgnorar.append((promedioIgnorarX, promedioIgnorarY))
			for h in contornosIgnorar:
				#cv2.circle(frame, (h[0], h[1]), 20, (255, 255, 255), -1)
				if (h[0] == promedioIgnorarX and h[1] == promedioIgnorarY):
					existe = True
			if not existe:
				contornosIgnorar.append((promedioIgnorarX, promedioIgnorarY))
				#print("Encontré un contorno que tengo que ignorar")

	#print("Todos los Contornos", todosContornos)
	#print("Contornos a Ignorar", contornosIgnorar)

def ignorarContornosQuietos(cnts):
	new_cnts = []
	Ignorar = False
	for cnt in cnts:
		(x, y), radius = minEnclosingCircle(cnt)
		print("Circulo Posible", (int(x), int(y), int(radius)))
		for i in contornosIgnorar:
			if x - i[0] >= -20 and x - i[0] <= 20 and y - i[1] >= -20 and y - i[1] <= 20:
				Ignorar = True
				break
			else:
				Ignorar = False
			
		if Ignorar == False: new_cnts.append(cnt)
	
	for i in new_cnts:
		print("Nueva lista", minEnclosingCircle(i))
	return new_cnts

# def ignorarQuieto(cnts):
# 	new_cnts = []
# 	Ignorar = False
# 	print("Puntos a ignorar", centrosIgnorar)
# 	for cnt in cnts:
# 		(x, y), radius = minEnclosingCircle(cnt)
# 		for i in centrosIgnorar:
# 			if x - i[0] >= -20 and x - i[0] <= 20:
# 				Ignorar = True
# 			else:
# 				Ignorar = False

# 			if Ignorar and y - i[1] >= -20 and y - i[1] <= 20:
# 				break
			
# 		if Ignorar == False: new_cnts.append(cnt)
	
# 	for i in new_cnts:
# 		print("Nueva lista", minEnclosingCircle(i))
# 	return new_cnts

def seEstaMoviendo(ultCentros):
	movimiento = False
	for i in range(2):
		restaA = ultCentros[4][0][i] - ultCentros[3][0][i]
		restaB = ultCentros[3][0][i] - ultCentros[2][0][i]
		restaC = ultCentros[2][0][i] - ultCentros[1][0][i]
		restaD = ultCentros[1][0][i] - ultCentros[0][0][i]
		if restaA + restaB + restaC + restaD >= 15:
			movimiento = True
		else:
			movimiento = False
			break
	
	if movimiento: 
		return True
	return False

def eliminarContornosInservibles():
	count = 0
	aBorrar = []
	for i in todosContornos:
		if (len(i) <= 5):
			aBorrar.append(count)
		count += 1
	
	n = 0
	for i in aBorrar:
		todosContornos.pop(i - n)
		n += 1

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
# countSegundosTotales cuenta cuanto tiempo pasó en segundos desde que empezó el video 
countSegundosTotales = 0
#centrosMovimiento = deque(maxlen=10)
ultimosCentros = deque(maxlen=5)
todosContornos = []
contornosIgnorar = []
#centrosIgnorar = []
pique = deque(maxlen=60)
pique2 = deque(maxlen=60)
pique3 = deque(maxlen=3)

#listaPrueba = [(1,1), (2,2), (3,3), (4,4), (5,500), (6,6), (7,7), (8,8), (9,9), (10,10)]
#a = centroQuieto(listaPrueba)
#print("Función centroQuieto:", a)
#print("Centros Ignorar", centrosIgnorar)

#listaContornos = []

#prevCircle = None
#dist = lambda x1,y1,x2,y2: (x1-x2)**2+(y1-y2)**2

#listaPrueba = [[[1, 2, 3], [5, 6, 3]], [[101, 102, 3]]]
#print("Lista Prueba", listaPrueba[0][0][0])

#listaPrueba = [(1, 1), (2, 2), (3, 3), (4, 4), (5, 5)]
#listaPrueba = []
#listaPrueba.append(((1, 1), (2, 2), (3, 3), (4, 4), (5, 5)))
#print("Lista Prueba", listaPrueba)

#todosContornos = [(1, 1, 1, 1), (2, 2, 2, 2, 2, 2), (3, 3, 3, 3, 3)]
#eliminarContornosInservibles()
#print("Todos Contornos", todosContornos)

numeroFrame = 0

while True:
	numeroFrame += 1
	print("Numero de Frame: ", numeroFrame)
	# Agarra el frame actual
	frame = vs.read()
	frame = frame[1] if args.get("video", False) else frame

	#frame2 = vs.read()
	#frame2 = frame2[1] if args.get("video", False) else frame

	# Verifica si termina el video
	if frame is None:
		break

	anchoOG = frame.shape[1]
	altoOG = frame.shape[0]

	estaCercaX = anchoOG * 10/100
	estaCercaY = altoOG * 10/100

	countSegundosTotales += 1/fps

	pts1 = np.float32([[topLeftX, topLeftY],       [topRightX, topRightY],
                    [bottomLeftX, bottomLeftY], [bottomRightX, bottomRightY]])
	pts2 = np.float32([[0, 0], [164, 0], [0, 474], [164, 474]])
	
	matrix = cv2.getPerspectiveTransform(pts1, pts2)
	result = cv2.warpPerspective(frame, matrix, (164, 474))

	frame = imutils.resize(frame, anchoOG * resizer, altoOG * resizer)
	#frame = imutils.resize(frame, height=768)
	
	#punto = [100, 300]
	#lista = [[105, 1250], [900, 100], [800, 500], [100, 100]]

	# cv2.circle(frame, (topLeftX, topLeftY), 2, (0, 0, 255), -1)
	# cv2.circle(frame, (topRightX, topRightY), 2, (0, 0, 255), -1)
	# cv2.circle(frame, (bottomLeftX, bottomLeftY), 2, (0, 0, 255), -1)
	# cv2.circle(frame, (bottomRightX, bottomRightY), 2, (0, 0, 255), -1)

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
	#cv2.imshow("mask2", mask)
	mask = cv2.erode(mask, None, iterations=2)
	mask = cv2.dilate(mask, None, iterations=2)
	#mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)   #morphology close operation for remove small noise point
	#cv2.imshow("mask3", mask)

	# Toma todos los contornos de la imagen
	cnts = cv2.findContours(mask.copy(), cv2.RETR_EXTERNAL,
		cv2.CHAIN_APPROX_SIMPLE)
	cnts = imutils.grab_contours(cnts)

	center = None

	# Pasamos ambos frames a una escala de grises
	#grayImage1 = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
	#grayImage2 = cv2.cvtColor(frame2, cv2.COLOR_BGR2GRAY)

	# Creamos una imagen vacía
	#vacia = np.zeros((altoOG,anchoOG,3),np.uint8)
	#vaciaCirculos = np.zeros((altoOG,anchoOG,3),np.uint8)

	# Vemos la diferencia entre los frames y le pasamos un threshold
	#diffImage = cv2.absdiff(grayImage1, grayImage2)
	#ret, thresh = cv2.threshold(grayImage1, 127, 255, 0)

	# Buscamos todos los contornos en la imagen
	#contornos, hierarchy = cv2.findContours(thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
	#contornos = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
	#contornos = imutils.grab_contours(contornos)

    # Verifica si se encontró un objeto
	#if (len(contornos)): objectDetected = True
	#else: objectDetected = False

	#print("Diferencia", diffImage)
	
	#for contorno in contornos:
		#(center, radius) = cv2.minEnclosingCircle(contorno)
		#listaContornos.append(center)
	#print("Contorno", max(contornos, key=cv2.contourArea))

	# Mostramos los contornos en la imagen vacía y la mostramos
	#cv2.drawContours(vacia, contornos, -1, (0,255,0), 3)
	
	#grayFrame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
	#blurFrame = cv2.GaussianBlur(grayFrame, (11,11), 0)
	
	#circles = cv2.HoughCircles(blurFrame, cv2.HOUGH_GRADIENT, 1.2, 100, 
                               #param1=100, param2=30, minRadius=1, maxRadius=20)
	
	#if circles is not None:
		#circles = np.uint16(np.around(circles))
		#chozen = None
		#for i in circles[0, :]:
			#if chozen is None: chozen = i
			#if prevCircle is not None:
				#if dist(chozen[0], chozen[1],prevCircle[0],prevCircle[1] <= dist(i[0],i[1],prevCircle[0],prevCircle[1])):
					#chozen = i
		#cv2.circle(frame, (chozen[0], chozen[1]), 1, (0,100,100), 3)
		#cv2.circle(frame, (chozen[0], chozen[1]), chozen[2], (255,0,255), 3)
		#prevCircle = chozen
	
	#circles = cv2.HoughCircles(grayImage1, cv2.HOUGH_GRADIENT, 1.1, 100)

	#if circles is not None:
	# convert the (x, y) coordinates and radius of the circles to integers
		#circles = np.round(circles[0, :]).astype("int")
		# loop over the (x, y) coordinates and radius of the circles
		#for (x, y, r) in circles:
			# draw the circle in the output image, then draw a rectangle corresponding to the center of the circle
			#cv2.circle(frame, (x, y), r, (0, 255, 0), 4)
			#cv2.rectangle(frame, (x - 5, y - 5), (x + 5, y + 5), (0, 128, 255), -1)

	#print("Circulos", circles)

	#cv2.imshow("Todos los contornos", vacia)

	for h in contornosIgnorar:
		cv2.circle(frame, (h[0], h[1]), 20, (255, 255, 255), -1)

	if (countSegundosTotales % 5 == 0):
		eliminarContornosInservibles()

	if len(cnts) > 0:
		# Busca el contorno más grande y encuentra su posición (x, y)
		contornosQuietos(cnts)
		#cnts = ignorarContornosQuietos(cnts)
		if len(ultimosCentros) == 5 and count >= 0.3 and not seEstaMoviendo(ultimosCentros):
			cnts = ignorarContornosQuietos(cnts)

		if len(cnts) > 0:
			if primeraVez:
				c = max(cnts, key=cv2.contourArea)
				((x, y), radius) = cv2.minEnclosingCircle(c)
				M = cv2.moments(c)
				center = (int(M["m10"] / M["m00"]), int(M["m01"] / M["m00"])), int(radius)
				primeraVez = False
				preCentro = center
				count = 0
				count2 = 0
				pique3.appendleft(center[0][1])
				#centrosMovimiento.clear()
				#centrosMovimiento.appendleft(center)
				ultimosCentros.appendleft(center)

			else:
				#if (len(cnts) >= 2 and len(centrosIgnorar) != 0): cnts = ignorarQuieto(cnts)
				#if (len(cnts) >= 1): c = tp_fix(cnts, preCentro, count)

				c = tp_fix(cnts, preCentro, count)

				if c is not None:
					((x, y), radius) = cv2.minEnclosingCircle(c)
					M = cv2.moments(c)
					center = (int(M["m10"] / M["m00"]), int(M["m01"] / M["m00"])), int(radius)
					preCentro = center
					count2 += count
					count = 0
					pique3.appendleft(center[0][1])
					#centrosMovimiento.appendleft(center)
					ultimosCentros.appendleft(center)
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
					
			# Sigue si el contorno tiene cierto 
			#if radius > 0:
			if radius > 0 and primeraVez and c is not None or c is not None:
				# Dibuja el círculo en la pelota
				cv2.circle(frame, (int(x), int(y)), int(radius), (0, 255, 255), 2)
				cv2.circle(frame, (center[0][0], center[0][1]), 5, (0, 0, 255), -1)

	else:
		print("COUNT", count)
		if count >= 0.3:
			primeraVez = True
			preCentro = None
		count += 1/fps
		count2 = 0

	# if (len(centrosMovimiento) == 10):
	# 	movimiento = centroQuieto(centrosMovimiento)
	# 	if movimiento:
	# 		primeraVez = True
 
	# Actualiza los puntos para trazar la trayectoria
	#pts.appendleft((center[0][0], center[0][1]))
	pts.appendleft(center)

	for i in range(1, len(pts)):
		# Ignora los puntos de trayectoria inexistentes
		if pts[i - 1] is None or pts[i] is None:
			continue

		# Traza la trayectoria
		thickness = int(np.sqrt(args["buffer"] / float(i + 1)) * 2.5)
		cv2.line(frame, pts[i - 1][0], pts[i][0], (0, 0, 255), thickness)
	
	bajando = False

	if (center is not None):
		print("Centro en el eje Y", center[0][1])
		pique.appendleft(center[0][1])
		
		if (len(pique) >= 2):
			if (pique[0] - pique[1] > 0):
				bajando = True
			if (pique[0] - pique[1] != 0):
				pique2.appendleft((bajando, numeroFrame))
			else: bajando = "Indeterminación"
			print("Bajando", bajando)

	if (len(pique2) >= 2):
		if pique2[0][0] == False and pique2[1][0] == True and preCentro is not None and pique2[0][1] - pique2[1][1] <= fps/6:
			print("Pique 2", pique2)
			print("Gerard")
			frame = cv2.putText(frame, 'Gerard', (preCentro[0][0], preCentro[0][1]), cv2.FONT_HERSHEY_COMPLEX, 3, (0, 0, 255), 0, 2)

	frame = imutils.resize(frame, anchoOG, altoOG)
	frame = imutils.resize(frame, height=768)
	mask = imutils.resize(mask, anchoOG, altoOG)
	mask = imutils.resize(mask, height=768)

	# Muestra el frame
	cv2.imshow("Mask", mask)
	cv2.imshow("V1", frame)
	cv2.imshow("Result", result)
	
	# Terminar la ejecución si se presiona la "q"
	key = cv2.waitKey(1) & 0xFF
	if key == ord("q"):
		break

	#print("Centro al terminar la iteración", center)
	#print("Ignorar", contornosIgnorar)
	#print("Count al terminar la iteración", count)
	print("Pasé de frame")

if not args.get("video", False):
	vs.stop()

else:
	vs.release()

cv2.destroyAllWindows()