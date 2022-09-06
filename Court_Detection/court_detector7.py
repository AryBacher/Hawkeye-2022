import cv2
import numpy as np
import imutils

img = cv2.imread("frameD.jpg")

img = imutils.resize(img, width=800, height=600)

topLeftX = 366
topLeftY = 196
topRightX = 608
topRightY = 198
bottomLeftX = 78
bottomLeftY = 378
bottomRightX = 724
bottomRightY = 398

# cv2.line(img, (topLeftX,topLeft2), (topRight1,topRight2), (255,0,0), 2)
# cv2.line(img, (topLeftX,topLeft2), (bottomLeft1,bottomLeft2), (255,0,0), 2)
# cv2.line(img, (topRight1,topRight2), (bottomRight1,bottomRight2), (255,0,0), 2)
# cv2.line(img, (bottomRight1,bottomRight2), (bottomLeft1,bottomLeft2), (255,0,0), 2)

cv2.circle(img, (topLeftX, topLeftY), 2, (0, 0, 255), -1)
cv2.circle(img, (topRightX, topRightY), 2, (0, 0, 255), -1)
cv2.circle(img, (bottomLeftX, bottomLeftY), 2, (0, 0, 255), -1)
cv2.circle(img, (bottomRightX, bottomRightY), 2, (0, 0, 255), -1)


pts1 = np.float32([[topLeftX, topLeftY],       [topRightX, topRightY],
                   [bottomLeftX, bottomLeftY], [bottomRightX, bottomRightY]])
pts2 = np.float32([[0, 0], [164, 0], [0, 474], [164, 474]])

matrix = cv2.getPerspectiveTransform(pts1, pts2)
result = cv2.warpPerspective(img, matrix, (164, 474))

cv2.line(result, (0, 108), (165, 108), (255,0,0), 2)

cv2.imshow("Image", img)
cv2.imshow("Perspective transformation", result)
cv2.waitKey(0)
cv2.destroyAllWindows()