import numpy as np
import matplotlib.pyplot as plt

x = np.random.randn(100000)
y = np.random.randn(100000)
plt.hist2d(x, y, (268, 524), cmap="inferno")
plt.show()