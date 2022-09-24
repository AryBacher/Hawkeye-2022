from collections import deque
from email.policy import default
from imutils.video import VideoStream
import numpy as np
import argparse
import cv2
import imutils
import time
import sys

sys.path.append('../')

# Se importa la función de trackeo de la pelota y del minimapa
from Tracker.trackerV1.ball_tracking_fn import ball_tracking, tp_fix
from Bounce_Detection.minimap import minimap

# Argumentos del programa
ap = argparse.ArgumentParser()
ap.add_argument("-v", "--video",
	help="path to the (optional) video file")
ap.add_argument("-b", "--buffer", type=int, default=64,
	help="max buffer size")
args = vars(ap.parse_args())

bajando = None

# Rango de deteccion de verdes
greenLower = np.array([29, 86, 110])
greenUpper = np.array([64, 255, 255])

# Puntos de las esquinas de la cancha
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



pts = deque(maxlen=args["buffer"])
pts_pers = deque(maxlen=args["buffer"])
pts_pique = []
center_pers = None

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

pique = deque(maxlen=60)
pique2 = deque(maxlen=60)
radios = deque(maxlen=60)

minimapa = minimap(pts_pique)

count = 0

while True:
	# Agarra el frame actual
	frame = vs.read()
	frame = frame[1] if args.get("video", False) else frame

	# Verifica si termina el video
	if frame is None:
		break
	
	# Se pasa la cancha de perspectiva a un plano 2D
	medidas_resize = [164, 474]
	n = 1
	pts1 = np.float32([[topLeftX, topLeftY],       [topRightX, topRightY],
					   [bottomLeftX, bottomLeftY], [bottomRightX, bottomRightY]])
	pts2 = np.float32([[0, 0], [medidas_resize[0] * n, 0], [0, medidas_resize[1] * n],
					   [medidas_resize[0] * n, medidas_resize[1] * n]])

	matrix = cv2.getPerspectiveTransform(pts1, pts2)
	result = cv2.warpPerspective(frame, matrix, (medidas_resize[0] * n, medidas_resize[1] * n))

	pre_center_pers = center_pers
	center_pers = ball_tracking(result, "pers")[0]
	pts_pers.appendleft(center_pers)

	cv2.circle(result, center_pers, 5, (0, 0, 255), -1)

	for i in range(1, len(pts_pers)):
		# Ignora los puntos de trayectoria inexistentes
		if pts_pers[i - 1] is None or pts_pers[i] is None:
			continue

		# Traza la trayectoria
		thickness = int(np.sqrt(args["buffer"] / float(i + 1)) * 2)
		cv2.line(result, pts_pers[i - 1], pts_pers[i], (0, 0, 255), thickness)
	#frame = imutils.resize(frame, width=800, height=600)

	# Cámara lenta para mayor análisis
	#cv2.waitKey(100)
	
	center = ball_tracking(frame, "normal")[0]
		#if radius > 0:
			# Dibuja el círculo en la pelota
			#cv2.circle(result, (int(x), int(y)), int(radius), (0, 255, 255), 2)
	
 
	# Actualiza los puntos para trazar la trayectoria
	pts.appendleft(center)
	print("CENTRO", center)

	for i in range(1, len(pts)):
		# Ignora los puntos de trayectoria inexistentes
		if pts[i - 1] is None or pts[i] is None:
			continue

		# Traza la trayectoria
		thickness = int(np.sqrt(args["buffer"] / float(i + 1)) * 2)
		cv2.line(frame, pts[i - 1], pts[i], (0, 0, 255), thickness)

	pre_bajando = bajando
	bajando = False

	# Determina si la pelota está bajando o subiendo
	if center is not None:
		pique.appendleft(center[1])
		if (len(pique) >= 2):
			if (pre_bajando == False and pique[0] - pique[1] > 3) or (pre_bajando and pique[0] - pique[1] >= 0):
				bajando = True
		pique2.appendleft(bajando)
		print("BAJANDO =", bajando)

	# Determina cuando pica
	if (len(pique2) >= 2):
		if pique2[0] == False and pique2[1] == True:
			print("Pica")
			frame = cv2.putText(frame, 'Pica', center, cv2.FONT_HERSHEY_COMPLEX, 3, (0, 0, 255), 0, 2)
			if pre_center_pers is not None: 
				pts_pique.append(pre_center_pers)
				minimapa = minimap(pts_pique)

	#radios.append(radius)
	acercando = False

	if (len(radios) >= 2):
		if radios[0] > radios[1]:
			acercando = True

	# Resizea la imagen final para que pueda ser visualizada
	result_resized = imutils.resize(result, width = 164, height = 474)

	# Muestra el frame
	cv2.imshow("Bounce Detector", frame)
	# cv2.imshow("Perspective Transformation", result)
	cv2.imshow("Perspective Transformation Resized", result_resized)

	# Se muestra el minimapa
	cv2.imshow("Minimapa", minimapa)

	# Terminar la ejecución si se presiona la "q"
	key = cv2.waitKey(1) & 0xFF
	if key == ord("q"):
		break

if not args.get("video", False):
	vs.stop()

else:
	vs.release()

cv2.destroyAllWindows()