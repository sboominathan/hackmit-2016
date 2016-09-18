import pafy

# note, we seem to be using python 2.x
url = raw_input("url")
video = pafy.new(url)

print video.title
best = video.getbest()
best.download(quiet=False)
file = open("newfile.txt", "w")
file.write("hello there")