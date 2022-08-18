# import numpy as np
# import cv2
# import opencv_wrapper as cvw

# # import  poly_point_isect as bot

# # construct the argument parse and parse the arguments
# # load the image
# image = cv2.imread("tennis.jpg")

# # define the list of boundaries
# boundaries = [([180, 180, 100], [255, 255, 255])]

# # loop over the boundaries
# for (lower, upper) in boundaries:
#     # create NumPy arrays from the boundaries
#     lower = np.array(lower, dtype="uint8")
#     upper = np.array(upper, dtype="uint8")

#     # find the colors within the specified boundaries and apply
#     # the mask
#     mask = cv2.inRange(image, lower, upper)
#     output = cv2.bitwise_and(image, image, mask=mask)

# # Start my code
# gray = cvw.bgr2gray(output)

# corners = cv2.cornerHarris(gray, 9, 3, 0.01)
# corners = cvw.normalize(corners).astype(np.uint8)

# thresh = cvw.threshold_otsu(corners)
# dilated = cvw.dilate(thresh, 3)

# contours = cvw.find_external_contours(dilated)

# for contour in contours:
#     cvw.circle(image, contour.center, 3, cvw.Color.RED, -1)

# cv2.imshow("Image", image)
# cv2.waitKey(0)


import numpy as np
import cv2

img = cv2.imread('tennis2.png')
img = cv2.resize(img, (0, 0), fx=1.25, fy=1.25)
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

corners = cv2.goodFeaturesToTrack(gray, 100, 0.05, 10)
corners = np.int0(corners)

for corner in corners:
	x, y = corner.ravel()
	cv2.circle(img, (x, y), 5, (255, 0, 0), -1)

# for i in range(len(corners)):
# 	for j in range(i + 1, len(corners)):
# 		corner1 = tuple(corners[i][0])
# 		corner2 = tuple(corners[j][0])
# 		color = tuple(map(lambda x: int(x), np.random.randint(0, 255, size=3)))
# 		cv2.line(img, corner1, corner2, color, 1)

cv2.imshow('Frame', img)
cv2.waitKey(0)
cv2.destroyAllWindows()