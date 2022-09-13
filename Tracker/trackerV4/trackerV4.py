import cv2 as cv
from imutils.video import VideoStream
import numpy as np
import argparse
import time
import imutils

ap = argparse.ArgumentParser()
ap.add_argument("-v", "--video",
	help="path to the (optional) video file")
ap.add_argument("-b", "--buffer", type=int, default=64,
	help="max buffer size")
args = vars(ap.parse_args())

if not args.get("video", False):
	vs = VideoStream(src=0).start()

# Toma video en caso de haber
else:
	vs = cv.VideoCapture(args["video"])


time.sleep(2.0)

videoCapture = cv.VideoCapture(0)
prevCircle = None
dist = lambda x1,y1,x2,y2: (x1-x2)**2+(y1-y2)**2

while True:
    frame = vs.read()
    frame = frame[1] if args.get("video", False) else frame

    if frame is None:
        break

    grayFrame = cv.cvtColor(frame, cv.COLOR_BGR2GRAY)
    blurFrame = cv.GaussianBlur(grayFrame, (11,11), 0)

    circles = cv.HoughCircles(blurFrame, cv.HOUGH_GRADIENT, 1.2, 100, 
                               param1=100, param2=30, minRadius=75, maxRadius=400)
    
    if circles is not None:
        circles = np.uint16(np.around(circles))
        chozen = None
        for i in circles[0, :]:
            if chozen is None: chozen = i
            if prevCircle is not None:
                if dist(chozen[0], chozen[1],prevCircle[0],prevCircle[1] <= dist(i[0],i[1],prevCircle[0],prevCircle[1])):
                    chozen = i
        cv.circle(frame, (chozen[0], chozen[1]), 1, (0,100,100), 3)
        cv.circle(frame, (chozen[0], chozen[1]), chozen[2], (255,0,255), 3)
        prevCircle = chozen
    
    cv.imshow("circles", frame)

    if cv.waitKey(1) & 0xFF == ord('q'): break

videoCapture.release()
cv.destroyAllWindows