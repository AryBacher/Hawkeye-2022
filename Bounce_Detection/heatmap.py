import numpy as np
import matplotlib.pyplot as plt
import seaborn as sb

x = np.array([100, 200, 300])
y = np.array([200, 300, 100])

#bins = (268, 524)
bins = (134, 262)

#plt.hist2d(x, y, bins=bins, cmap="inferno")
#plt.show()

pts = np.array([[100, 100], [200, 100], [200, 200], [150, 100]])

#plt.imshow(pts, cmap='inferno', interpolation='nearest')
#plt.show()

# generate 2 2d grids for the x & y bounds
y, x = np.meshgrid(np.linspace(-3, 3, 100), np.linspace(-3, 3, 100))

z = (1 - x / 2. + x ** 5 + y ** 3) * np.exp(-x ** 2 - y ** 2)
# x and y are bounds, so z should be the value *inside* those bounds.
# Therefore, remove the last value from the z array.
z = z[:-1, :-1]
z_min, z_max = -np.abs(z).max(), np.abs(z).max()

fig, ax = plt.subplots()

c = ax.pcolormesh(x, y, z, cmap='RdBu', vmin=z_min, vmax=z_max)
ax.set_title('pcolormesh')
# set the limits of the plot to the limits of the data
ax.axis([x.min(), x.max(), y.min(), y.max()])
fig.colorbar(c, ax=ax)

plt.show()

#heatmap = sb.heatmap(pts)
#sb.show(heatmap)