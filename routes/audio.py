from moviepy.editor import VideoFileClip, concatenate_videoclips
import moviepy
import random

def wordsToTimes(input, word_bank, video):
	clips = []
	for word in input.split(" "):
		if word not in word_bank:
			continue
		times = word_bank[word]
		random_time = random.choice(times)
		start_time = random_time["start"]
		end_time = random_time["end"]
		clip = VideoFileClip(video).subclip(start_time, end_time)
		clips.append(clip)
	final_clip = concatenate_videoclips(clips)
	final_clip.write_videofile("results.mp4")

# def test():
# 	input = ["good", "executing", "i", "like", "you", "thank", "you"]
# 	word_bank = {"good": [{"start": 72.24, "end": 72.43}], "executing": [{"start": 77.06,"end": 77.57}], "i": [{"start": 53.66,"end": 53.69}],
# 				"like": [{"start": 53.89, "end": 54.11}], "you": [{"start": 54.58, "end": 54.69}, {"start": 54.11, "end": 54.3}], "thank": [{"start": 87.37,"end": 87.57}]}
# 	video = "test2.mp4"
# 	wordsToTimes(input, word_bank, video)


# test()



