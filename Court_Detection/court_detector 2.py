import numpy as np
import cv2
import opencv_wrapper as cvw

# import  poly_point_isect as bot

# construct the argument parse and parse the arguments
# load the image
image = cv2.imread("tennis.jpg")

# define the list of boundaries
boundaries = [([180, 180, 100], [255, 255, 255])]

# loop over the boundaries
for (lower, upper) in boundaries:
    # create NumPy arrays from the boundaries
    lower = np.array(lower, dtype="uint8")
    upper = np.array(upper, dtype="uint8")

    # find the colors within the specified boundaries and apply
    # the mask
    mask = cv2.inRange(image, lower, upper)
    output = cv2.bitwise_and(image, image, mask=mask)

# Start my code
gray = cvw.bgr2gray(output)

corners = cv2.cornerHarris(gray, 9, 3, 0.01)
corners = cvw.normalize(corners).astype(np.uint8)

thresh = cvw.threshold_otsu(corners)
dilated = cvw.dilate(thresh, 3)

contours = cvw.find_external_contours(dilated)

for contour in contours:
    cvw.circle(image, contour.center, 3, cvw.Color.RED, -1)

cv2.imshow("Image", image)
cv2.waitKey(0)