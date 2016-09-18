from moviepy.editor import VideoFileClip, concatenate_videoclips
import random

def wordsToTimes(input, word_bank, video):
	clips = []
	for word in input:
		if word not in word_bank:
			continue
		times = word_bank[word]
		start, end = random.choice(times)
		clip = VideoFileClip(video).subclip(start, end)
		clips.append(clip)
	final_clip = concatenate_videoclips(clips)
	final_clip.write_videofile("results.mp4")



