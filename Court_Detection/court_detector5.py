from imutils.video import VideoStream
import numpy as np
import argparse
import cv2
import time
import imutils

# construct the argument parse and parse the arguments
ap = argparse.ArgumentParser()
ap.add_argument("-v", "--video",
	help="path to the (optional) video file")
ap.add_argument("-b", "--buffer", type=int, default=64,
	help="max buffer size")
args = vars(ap.parse_args())

def display_lines(frame, lines):
    for line in lines:
        x1, y1, x2, y2 = line

        #if x2 - x1 < 2 or y2 - y1 < 2:
            #continue
        
        cv2.line(frame, (x1,y1), (x2,y2), (0,255,0), 2)
        cv2.circle(frame, (x1,y1), 1, (255,0,0), 2)
        cv2.circle(frame, (x2,y2), 1, (255,0,0), 2)

    #cv2.imshow("Court Detector 5", frame)
    #cv2.waitKey(0)

def filter_by_coordinates(lines, box):
    xmin, ymin, xmax, ymax = box
    lines_filtered = list()
    for line in lines:
        x1, y1, x2, y2 = line
        if min(x1, x2) < xmin or min(y1,y2) < ymin or max(x1,x2) > xmax or max(y1,y2) > ymax:
            pass
        else:
            lines_filtered.append(line)
    return lines_filtered


# if a video path was not supplied, grab the reference
# to the webcam
if not args.get("video", False):
	vs = VideoStream(src=0).start()

# otherwise, grab a reference to the video file
else:
	vs = cv2.VideoCapture(args["video"])

while True:

    #ver si la linea está en diagonal. Para esto, hay que ver si hay una cierta distancia entre 
    #los dos x y los y (x1,x2,y1,y2)

    frame = vs.read()
    
    frame = frame[1] if args.get("video", False) else frame
    
    if frame is None:
        break
    
    frame = imutils.resize(frame, width=1280, height=720)

    salida = cv2.imwrite("frameD.jpg", frame)

    #frame = cv2.imread('frameD.jpg')

    #frame = cv2.resize(frame, (frame.shape[1] // 1, frame.shape[0] // 1))
    
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    gray = cv2.threshold(gray, 180, 255, cv2.THRESH_BINARY)[1]

    corners = cv2.goodFeaturesToTrack(gray, 100, 0.01, 10)
    corners = np.int0(corners)
    
    for corner in corners:
        x, y = corner.ravel()
        cv2.circle(frame, (x, y), 5, (0, 0, 255), -1)

    lines = cv2.HoughLinesP(gray, 1, np.pi /180, 50, minLineLength=80, maxLineGap=20)
    lines = np.squeeze(lines)

    #print(frame.shape[1])
    #print(frame.shape[0])

    lines = filter_by_coordinates(lines, (0, 100, gray.shape[1] - 0, gray.shape[0] - 0))

    display_lines(frame, lines)

    cv2.imshow("Court Detector 5", frame)
    key = cv2.waitKey(0) & 0xFF

    if key == ord("q"):
        break

    time.sleep(7)
    break

if not args.get("video", False):
    vs.stop()

else:
    vs.release()

cv2.destroyAllWindows()