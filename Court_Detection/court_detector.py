import cv2 as cv
import numpy as np
import math
import argparse
import imutils
import time
from collections import deque
from imutils.video import VideoStream


ap = argparse.ArgumentParser()
ap.add_argument("-v", "--video",
	help="path to the (optional) video file")
ap.add_argument("-b", "--buffer", type=int, default=64,
	help="max buffer size")
args = vars(ap.parse_args())

if not args.get("video", False):
	vs = VideoStream(src=0).start()

# otherwise, grab a reference to the video file
else:
	vs = cv.VideoCapture(args["video"])

time.sleep(2.0)

pts = deque(maxlen=args["buffer"])
kernel = cv.getStructuringElement(cv.MORPH_ELLIPSE,(5,5))  #ellipse kernel

while True:
#grab the current frame
    src_img = vs.read()

    #handle the frame from VideoCapture or VideoStream
    src_img = src_img[1] if args.get("video", False) else src_img

    #if we are viewing a video and we did not grab a frame,
    # then we have reached the end of the video
    if src_img is None:
        break
    
    src_img = imutils.resize(src_img,width = 600)
    blurred = cv.GaussianBlur(src_img, (11,11),0)
    hsv = cv.cvtColor(blurred, cv.COLOR_BGR2HSV)

    mask = cv.inRange(hsv, (180,180,100), (255,255,255))
    mask = cv.erode(mask, None, iterations=2)
    mask = cv.dilate(mask, None, iterations=2)
    mask = cv.morphologyEx(mask, cv.MORPH_OPEN, kernel)   #morphology close operation for remove small noise point

    cnts = cv.findContours(mask.copy(), cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE)
    cnts = imutils.grab_contours(cnts)
    center = None
    cv.imshow("Mask", mask)

    dst_img = cv.Canny(src_img, 50, 200, None, 3)
    lines = cv.HoughLines(dst_img, 1, np.pi / 180, 150, None, 0, 0)

    for i in range(0, len(lines)):
        rho_l = lines[i][0][0]
        theta_l = lines[i][0][1]
        a_l = math.cos(theta_l)
        b_l = math.sin(theta_l)
        x0_l = a_l * rho_l
        y0_l = b_l * rho_l
        pt1_l = (int(x0_l + 1000*(-b_l)), int(y0_l + 1000*(a_l)))
        pt2_l = (int(x0_l - 1000*(-b_l)), int(y0_l - 1000*(a_l)))
        cv.line(src_img, pt1_l, pt2_l, (0,0,255), 1, cv.LINE_AA)
	
    cv.imshow("Video with lines", src_img)
    key = cv.waitKey(1) & 0xFF

	# if the 'q' key is pressed, stop the loop
    if key == ord("q"):
	    break

# if we are not using a video file, stop the camera video stream
if not args.get("video", False):
	vs.stop()

# otherwise, release the camera
else:
	vs.release()

# close all windows
cv.destroyAllWindows()





