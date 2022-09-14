from collections import deque
from email.policy import default
from imutils.video import VideoStream
import numpy as np
import argparse
import cv2
import imutils
import time

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

# Puntos de las esquinas de la cancha
topLeftX = 311
topLeftY = 106
topRightX = 456
topRightY = 105
bottomLeftX = 89
bottomLeftY = 331
bottomRightX = 628
bottomRightY = 326

#Puntos de Esquinas Alcaraz vs Fucsovics: 366, 196, 608, 198, 78, 378, 724, 398
#Puntos de Esquinas TennisBrothers: 311, 106, 456, 105, 89, 331, 628, 326

#BGR_prueba = np.array([[[0,255,0]]], dtype=np.uint8)
#x = cv2.cvtColor(greenUpper, cv2.COLOR_HSV2BGR)
#print(x)

pts = deque(maxlen=args["buffer"])

#kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(5,5))  #ellipse kernel

# Toma la cámara si no recibe video
if not args.get("video", False):
	vs = VideoStream(src=0).start()

# Toma video en caso de haber
else:
	vs = cv2.VideoCapture(args["video"])
	
	#fps del video
	fps = int(vs.get(cv2.CAP_PROP_FPS))
	print(fps)

time.sleep(2.0)

pique = deque(maxlen=60)
pique2 = deque(maxlen=60)
radios = deque(maxlen=60)
radios2 = deque(maxlen=60)


#se crean frames temporales para mayor eficencia de procesado


while True:
	# Agarra el frame actual
	frame = vs.read()
	frame = frame[1] if args.get("video", False) else frame

	# Verifica si termina el video
	if frame is None:
		break

	#frame = imutils.resize(frame, width=800, height=600)

	# Cámara lenta para mayor análisis
	#cv2.waitKey(100)

	# resize the frame, blur it, and convert it to the HSV
	# color space
	blurred = cv2.GaussianBlur(frame, (11, 11), 0)
	#blurred = cv2.dilate(frame, None, iterations=2)
	hsv = cv2.cvtColor(blurred, cv2.COLOR_BGR2HSV)

	# Filtra los tonos verdes de la imagen
	mask = cv2.inRange(hsv, greenLower, greenUpper)
	#cv2.imshow("mask2", mask)
	mask = cv2.erode(mask, None, iterations=2)
	mask = cv2.dilate(mask, None, iterations=2)
	#mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)
	cv2.imshow("mask3", mask)

	# Toma todos los contornos de la imagen
	cnts = cv2.findContours(mask.copy(), cv2.RETR_EXTERNAL,
		cv2.CHAIN_APPROX_SIMPLE)
	cnts = imutils.grab_contours(cnts)
	#print(cnts)
	center = None

	pts1 = np.float32([[topLeftX, topLeftY],       [topRightX, topRightY],
	[bottomLeftX, bottomLeftY], [bottomRightX, bottomRightY]])
	pts2 = np.float32([[0, 0], [164, 0], [0, 474], [164, 474]])

	matrix = cv2.getPerspectiveTransform(pts1, pts2)
	result = cv2.warpPerspective(frame, matrix, (164, 474))

	cv2.line(result, (0, 110), (165, 110), (0, 0, 255), 1)
	cv2.line(result, (0, 364), (165, 364), (0, 0, 255), 1)
	cv2.line(result, (0, 237), (165, 237), (0, 0, 255), 1)

	if len(cnts) > 0:
		# Busca el contorno más grande y encuentra su posición (x, y)
		c = max(cnts, key=cv2.contourArea)
		((x, y), radius) = cv2.minEnclosingCircle(c)
		#print(x)
		#print(y)
		M = cv2.moments(c)
		center = (int(M["m10"] / M["m00"]), int(M["m01"] / M["m00"]))

		# Sigue si el contorno tiene cierto tamaño
		if radius > 0:
			# Dibuja el círculo en la pelota
			cv2.circle(frame, (int(x), int(y)), int(radius), (0, 255, 255), 2)
			cv2.circle(frame, center, 5, (0, 0, 255), -1)
		
		radios.append(radius)
 
	# Actualiza los puntos para trazar la trayectoria
	pts.appendleft(center)

	for i in range(1, len(pts)):
		# Ignora los puntos de trayectoria inexistentes
		if pts[i - 1] is None or pts[i] is None:
			continue

		# Traza la trayectoria
		thickness = int(np.sqrt(args["buffer"] / float(i + 1)) * 2.5)
		cv2.line(frame, pts[i - 1], pts[i], (0, 0, 255), thickness)


	bajando = False
	acercando = False
	golpe = False

	if (center is not None):
		print(center[1])
		pique.appendleft(center[1])
		
		if (len(pique) >= 2):
			if (pique[0] - pique[1] > 0):
				bajando = True
		
		if (len(radios) >= 2):
			if radios[0] > radios[1]:
				acercando = True

		radios2.append(acercando)
		pique2.appendleft(bajando)
		print(bajando)

	if (len(radios2) >= 2):
		if (radios2[0] == True and radios2[1] == False or radios2[0] == False and radios2[1] == True):
			golpe = True

	if (len(pique2) >= 2):
		if pique2[0] == False and pique2[1] == True and golpe == False:
			print("Gerard")
			frame = cv2.putText(frame, 'Gerard', center, cv2.FONT_HERSHEY_COMPLEX, 3, (0, 0, 255), 0, 2)


	# Hay que fijarse si la pelota es más grande
	

	# Muestra el frame
	cv2.imshow("Bounce Detector", frame)
	cv2.imshow("Perspective Transformation", result)

	# Terminar la ejecución si se presiona la "q"
	key = cv2.waitKey(1) & 0xFF
	if key == ord("q"):
		break

if not args.get("video", False):
	vs.stop()

else:
	vs.release()

cv2.destroyAllWindows()