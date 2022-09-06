import cv2
import numpy as np
import imutils

img = cv2.imread("frameD.jpg")

img = imutils.resize(img, width=800, height=600)

topLeft1 = 366
topLeft2 = 196
topRight1 = 608
topRight2 = 198
bottomLeft1 = 78
bottomLeft2 = 378
bottomRight1 = 724
bottomRight2 = 398

# cv2.line(img, (topLeft1,topLeft2), (topRight1,topRight2), (255,0,0), 2)
# cv2.line(img, (topLeft1,topLeft2), (bottomLeft1,bottomLeft2), (255,0,0), 2)
# cv2.line(img, (topRight1,topRight2), (bottomRight1,bottomRight2), (255,0,0), 2)
# cv2.line(img, (bottomRight1,bottomRight2), (bottomLeft1,bottomLeft2), (255,0,0), 2)

cv2.circle(img, (topLeft1, topLeft2), 2, (0, 0, 255), -1)
cv2.circle(img, (topRight1, topRight2), 2, (0, 0, 255), -1)
cv2.circle(img, (bottomLeft1, bottomLeft2), 2, (0, 0, 255), -1)
cv2.circle(img, (bottomRight1, bottomRight2), 2, (0, 0, 255), -1)


pts1 = np.float32([[topLeft1, topLeft2], [topRight1, topRight2],
 [bottomLeft1, bottomLeft2], [bottomRight1, bottomRight2]])
pts2 = np.float32([[0, 0], [200, 0], [0, 600], [200, 600]])

matrix = cv2.getPerspectiveTransform(pts1, pts2)
result = cv2.warpPerspective(img, matrix, (200, 600))

cv2.line(result, (800, 150), (0,150), (255,0,0), 2)

cv2.imshow("Image", img)
cv2.imshow("Perspective transformation", result)
cv2.waitKey(0)
cv2.destroyAllWindows()