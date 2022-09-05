import cv2
import numpy as np
import imutils

img = cv2.imread("frameD.jpg")

img = imutils.resize(img, width=800, height=600)

cv2.circle(img, (262, 220), 2, (0, 0, 255), -1)
cv2.circle(img, (444, 223), 2, (0, 0, 255), -1)
cv2.circle(img, (38, 374), 2, (0, 0, 255), -1)
cv2.circle(img, (730, 368), 2, (0, 0, 255), -1)

pts1 = np.float32([[262, 220], [444, 223], [38, 374], [730, 1368]])
pts2 = np.float32([[0, 0], [800, 0], [0, 600], [800, 600]])

matrix = cv2.getPerspectiveTransform(pts1, pts2)
result = cv2.warpPerspective(img, matrix, (800, 600))

cv2.imshow("Image", img)
cv2.imshow("Perspective transformation", result)
cv2.waitKey(0)
cv2.destroyAllWindows()