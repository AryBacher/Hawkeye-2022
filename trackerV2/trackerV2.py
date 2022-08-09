import cv2 as cv
from cv2 import threshold
from cv2 import waitKey
import imutils
import argparse
import time

SENSITIVITY_VALUE = 20
BLUR_SIZE = 9
objectDetected = False

# Recibe un video por terminal
ap = argparse.ArgumentParser()
ap.add_argument("-v", "--video",
	help="path to the (optional) video file")
args = vars(ap.parse_args())

def searchForMovement(thresholdImage, cameraFeed):
    # Busca todos los contornos

    contours = cv.findContours(thresholdImage, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE)
    contours = imutils.grab_contours(contours)

    # Verifica si se encontró un objeto
    if (len(contours)): objectDetected = True
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
        cv.circle(cameraFeed, center, 5, (0, 0, 255), -1)
    
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

    #while(vs.get(cv.CAP_PROP_FRAME_COUNT)<vs.get(cv.CAP_PROP_FRAME_COUNT)-1):
    # Lee el primer frame y lo pasa a escala de grises
    
    grayImage1 = cv.cvtColor(frame1, cv.COLOR_BGR2GRAY)

    # Hace lo mismo con el segundo
    
    grayImage2 = cv.cvtColor(frame2, cv.COLOR_BGR2GRAY)

    # Detecta la diferencia entre los frames y le pasa unos filtros
    diffImage = cv.absdiff(grayImage1, grayImage2)
    thresholdImage = cv.threshold(diffImage, SENSITIVITY_VALUE, 255, cv.THRESH_BINARY)
    thresholdImage = thresholdImage[1]
    thresholdImage = cv.GaussianBlur(thresholdImage, (BLUR_SIZE, BLUR_SIZE), 0)
    thresholdImage = cv.threshold(thresholdImage, SENSITIVITY_VALUE, 255, cv.THRESH_BINARY)
    thresholdImage = thresholdImage[1]

    cv.imshow('Frame',searchForMovement(thresholdImage, frame1))

    if cv.waitKey(10) & 0xFF == ord("q"):
        break

vs.release()
cv.destroyAllWindows()