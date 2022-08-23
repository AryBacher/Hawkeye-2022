import cv2
import numpy as np

def display_lines(img, lines):
    for line in lines:
        x1, y1, x2, y2 = line
        cv2.line(img, (x1,y1), (x2,y2), (0,255,0), 2)
        cv2.circle(img, (x1,y1), 1, (255,0,0), 2)
        cv2.circle(img, (x2,y2), 1, (255,0,0), 2)

    cv2.imshow('Image with Lines',img)
    cv2.waitKey(0)

img = cv2.imread('Foto Video3jpg.jpg')
img = cv2.resize(img, (img.shape[1] // 1, img.shape[0] // 1))

gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
gray = cv2.threshold(gray, 180, 255, cv2.THRESH_BINARY)[1]

lines = cv2.HoughLinesP(gray, 1, np.pi /180, 50, minLineLength=80, maxLineGap=20)
lines = np.squeeze(lines)

display_lines(img, lines)

#cv2.imshow('Image', gray)
#cv2.waitKey(0)