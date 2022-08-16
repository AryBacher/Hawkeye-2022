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

#src_img = cv.imread('test.png')
#cv.imshow('Original Image',src_img)

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
    frame = vs.read()

    #handle the frame from VideoCapture or VideoStream
    frame = frame[1] if args.get("video", False) else frame

    #if we are viewing a video and we did not grab a frame,
    # then we have reached the end of the video
    if frame is None:
        break
    
    src_img = imutils.resize(src_img,width = 600)
    blurred = cv.GaussianBlur(src_img, (11,11),0)
    hsv = cv.cvtColor(blurred, cv.COLOR_BGR2HSV)

    mask = cv.inRange(hsv, (0,0,0), (255,255,255))
    mask = cv.erode(mask, None, iterations=2)
    mask = cv.dilate(mask, None, iterations=2)

    cnts = cv.findContours(mask.copy(), cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE)
    cnts = imutils.grab_contours(cnts)
    center = None



while True:
	# grab the current frame
	src_img = vs.read()

	# handle the frame from VideoCapture or VideoStream
	src_img = src_img[1] if args.get("video", False) else src_img

	# if we are viewing a video and we did not grab a frame,
	# then we have reached the end of the video
	if src_img is None:
		break

	# resize the frame, blur it, and convert it to the HSV
	# color space
	src_img = imutils.resize(src_img, width=600)
	blurred = cv.GaussianBlur(src_img, (11, 11), 0)
	hsv = cv.cvtColor(blurred, cv.COLOR_BGR2HSV)

	# construct a mask for the color "green", then perform
	# a series of dilations and erosions to remove any small
	# blobs left in the mask
	mask = cv.inRange(hsv, (0,0,0), (1,1,1))
	mask = cv.erode(mask, None, iterations=2)
	mask = cv.dilate(mask, None, iterations=2)
	mask = cv.morphologyEx(mask, cv.MORPH_OPEN, kernel)   #morphology close operation for remove small noise point
	#cv.imshow("mask2", mask)

	# find contours in the mask and initialize the current
	# (x, y) center of the ball
	cnts = cv.findContours(mask.copy(), cv.RETR_EXTERNAL,
		cv.CHAIN_APPROX_SIMPLE)
	cnts = imutils.grab_contours(cnts)
	center = None

	print(cnts)
	

	# only proceed if at least one contour was found
	if len(cnts) > 0:
		# find the largest contour in the mask, then use
		# it to compute the minimum enclosing circle and
		# centroid
		c = max(cnts, key=cv.contourArea)
		((x, y), radius) = cv.minEnclosingCircle(c)
		M = cv.moments(c)
		center = (int(M["m10"] / M["m00"]), int(M["m01"] / M["m00"]))

		# only proceed if the radius meets a minimum size
		if radius > 0:
			# draw the circle and centroid on the frame,
			# then update the list of tracked points
			cv.circle(src_img, (int(x), int(y)), int(radius), (0, 255, 255), 2)
			cv.circle(src_img, center, 5, (0, 0, 255), -1)
    
	# update the points queue
	pts.appendleft(center)
    
	# loop over the set of tracked points
	# for i in range(1, len(pts)):
	# 	# if either of the tracked points are None, ignore
	# 	# them
	# 	if pts[i - 1] is None or pts[i] is None:
	# 		continue

	# 	# otherwise, compute the thickness of the line and
	# 	# draw the connecting lines
	# 	thickness = int(np.sqrt(args["buffer"] / float(i + 1)) * 2.5)
	# 	cv.line(src_img, pts[i - 1], pts[i], (0, 0, 255), thickness)

    

	# show the frame to our screen
	cv.imshow("V1", src_img)
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
cv.waitKey(0)


