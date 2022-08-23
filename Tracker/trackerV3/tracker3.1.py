import cv2
import imutils
import numpy as np
from collections import deque

ix, iy, k = 200,200,1
pts = deque(maxlen=64)
greenLower = (29, 86, 100)
greenUpper = (64, 255, 255)

def onMouse(event, x, y, flag, param):
	global ix,iy,k
	if event == cv2.EVENT_LBUTTONDOWN:
		ix,iy = x,y 
		k = -1

cv2.namedWindow("window")
cv2.setMouseCallback("window", onMouse)

cap = cv2.VideoCapture(r"C:\Users\46919295\Documents\GitHub\Hawkeye\Videos Tenis para Analizar\The Ultimate Clutch 🔥🎾 #shorts 720p.mp4")

# Get fps
fps = int(cap.get(cv2.CAP_PROP_FPS))
print(fps)


_, frm = cap.read()
frm = imutils.resize(frm, width=500)
cv2.imshow("window", frm)
hsv1 = cv2.cvtColor(frm, cv2.COLOR_BGR2HSV)
frm_verde = cv2.inRange(hsv1, greenLower, greenUpper)
cv2.imshow('verde', frm_verde)

while True:

	if cv2.waitKey(1) == 113 or k == -1:
		old_gray = frm_verde.copy()
		cv2.destroyAllWindows()
		break

old_pts = np.array([[ix,iy]], dtype="float32").reshape(-1,1,2)
mask = np.zeros_like(frm)

while True:
    _, frame2 = cap.read()

    if cv2.waitKey(1) == 113 or frame2 is None:
        cap.release()
        cv2.destroyAllWindows()
        break 

    frame2 = imutils.resize(frame2, width=500)
    hsv2 = cv2.cvtColor(frame2, cv2.COLOR_BGR2HSV)
    frame2_verde = cv2.inRange(hsv2, greenLower, greenUpper)

    new_gray = frame2_verde.copy()

    new_pts,status,err = cv2.calcOpticalFlowPyrLK(old_gray, 
                            new_gray, 
                            old_pts, 
                            None, maxLevel=1,
                            criteria=(cv2.TERM_CRITERIA_EPS | cv2.TERM_CRITERIA_COUNT,
                                                            15, 0.08))

    # Draws a line
    pts.appendleft((int(new_pts.ravel()[0]) ,int(new_pts.ravel()[1])))
    for i in range(1, len(pts)):
        if pts[i - 1] is None or pts[i] is None:
            continue
        thickness = int(np.sqrt(64 / float(i + 1)) * 2.5)
        cv2.line(frame2, pts[i - 1], pts[i], (0, 0, 255), thickness)

    cv2.circle(mask, (int(new_pts.ravel()[0]) ,int(new_pts.ravel()[1])), 2, (0,255,0), 2)

    cv2.imshow("new win", mask)
    cv2.imshow("wind", frame2)
    cv2.imshow("verde", frame2_verde)

    old_gray = new_gray.copy()
    old_pts = new_pts.copy()

    key = cv2.waitKey(int(1000 / fps))
