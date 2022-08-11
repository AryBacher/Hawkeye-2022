import cv2 as cv
from cv2 import threshold
from cv2 import waitKey
import imutils
import argparse
import time
from collections import deque
import numpy as np


SENSITIVITY_VALUE = 20
BLUR_SIZE = 9
objectDetected = False
greenLower = (29, 86, 100)
greenUpper = (64, 255, 255)

# Recibe un video por terminal
ap = argparse.ArgumentParser()
ap.add_argument("-v", "--video",
	help="path to the (optional) video file")
ap.add_argument("-b", "--buffer", type=int, default=64,
	help="max buffer size")
args = vars(ap.parse_args())

pts = deque(maxlen=args["buffer"])

def searchForMovement(thresholdImage, cameraFeed):
    # Busca todos los contornos
    contours = cv.findContours(thresholdImage, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE)
    contours = imutils.grab_contours(contours)
    center = None

    # Verifica si se encontró un objeto
    if (len(contours) > 0): objectDetected = True
    else: objectDetected = False

    if (objectDetected):
        # Selecciona el contorno más grande y calcula su posición
        # y centro
        maxContour = max(contours, key=cv.contourArea)
        ((x, y), radius) = cv.minEnclosingCircle(maxContour)
        M = cv.moments(maxContour)
        center = (int(M["m10"] / M["m00"]), int(M["m01"] / M["m00"]))

        # Dibuja un círculo y un punto sobre el objeto
        cv.circle(cameraFeed, (int(x), int(y)), int(radius), (0, 255, 255), 2)
        cv.circle(cameraFeed, center, 2, (0, 0, 255), -1)
    
    pts.appendleft(center)

    for i in range(1, len(pts)):
		# if either of the tracked points are None, ignore
		# them
        if pts[i - 1] is None or pts[i] is None:
            continue

		# otherwise, compute the thickness of the line and
		# draw the connecting lines
        thickness = int(np.sqrt(args["buffer"] / float(i + 1)) * 2.5)
        cv.line(cameraFeed, pts[i - 1], pts[i], (0, 0, 255), thickness)
    
    return cameraFeed

vs = cv.VideoCapture(args["video"])
time.sleep(2.0)

while True:
    #vs = cv.VideoCapture("y2mate.com - The Ultimate Clutch  shorts_v144P.mp4")

    frame1 = vs.read()
    frame1 = frame1[1] if args.get("video", False) else frame1

    frame2 = vs.read()
    frame2 = frame2[1] if args.get("video", False) else frame2

    if frame1 is None or frame2 is None:
        break

    blurred1 = cv.GaussianBlur(frame1, (11, 11), 0)
    hsv1 = cv.cvtColor(blurred1, cv.COLOR_BGR2HSV)
    
    mask1 = cv.inRange(hsv1, greenLower, greenUpper)
    cv.imshow("mask", mask1)
    mask1 = cv.erode(mask1, None, iterations=2)
    mask1 = cv.dilate(mask1, None, iterations=2)

    blurred2 = cv.GaussianBlur(frame2, (11, 11), 0)
    hsv2 = cv.cvtColor(blurred2, cv.COLOR_BGR2HSV)
    
    mask2 = cv.inRange(hsv2, greenLower, greenUpper)
    cv.imshow("mask", mask2)
    mask2 = cv.erode(mask2, None, iterations=2)
    mask2 = cv.dilate(mask2, None, iterations=2)

    # Detecta la diferencia entre los frames y le pasa unos filtros
    diffImage = cv.absdiff(mask1, mask2)
    thresholdImage = cv.threshold(diffImage, SENSITIVITY_VALUE, 255, cv.THRESH_BINARY)
    thresholdImage = thresholdImage[1]
    thresholdImage = cv.GaussianBlur(thresholdImage, (BLUR_SIZE, BLUR_SIZE), 0)
    thresholdImage = cv.threshold(thresholdImage, SENSITIVITY_VALUE, 255, cv.THRESH_BINARY)
    thresholdImage = thresholdImage[1]

    cv.imshow('V2.1',searchForMovement(thresholdImage, frame1))

    if cv.waitKey(10) & 0xFF == ord("q"):
        break

vs.release()
cv.destroyAllWindows()