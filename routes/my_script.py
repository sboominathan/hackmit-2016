import pafy
import moviepy.editor as mp
import sys

# # note, we seem to be using python 2.x
# url = raw_input()
url = "https://www.youtube.com/watch?v=A7kVSDbHc3E"
video = pafy.new(url)

# # print video.title
best = video.getbest(preftype="mp4")
best.download(filepath="./video1." + best.extension,quiet=True)
# # best.download(quiet=False)
print "doessalkdfjs"
clip = mp.VideoFileClip("video1.mp4")
# print "sdfsdfsd"
clip.audio.write_audiofile("audio1.wav")
print "finished1"