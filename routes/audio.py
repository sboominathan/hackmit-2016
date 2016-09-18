from moviepy.editor import VideoFileClip, concatenate_videoclips
import moviepy
import random
import ast
	
input1 = raw_input()
dict_string = raw_input()
video = "video1.mp4"

word_dict = {}

# for group in dict_string.split(";"):
# 	pieces = []
# 	for piece in group.split(","):
# 		pieces.append(piece)
# 	for 

word_dict = ast.literal_eval(dict_string)

clips = []
for word in input1.split(" "):
	if word not in word_dict:
		continue
	times = word_dict[word]
	random_time = random.choice(times)
	start_time = random_time["start"]-.05
	end_time = random_time["end"]+.05
	clip = VideoFileClip(video).subclip(start_time, end_time)
	clips.append(clip)
final_clip = concatenate_videoclips(clips)
final_clip.write_videofile("public/results.mp4")

# def test():
# 	input = ["good", "executing", "i", "like", "you", "thank", "you"]
# 	word_bank = {"good": [{"start": 72.24, "end": 72.43}], "executing": [{"start": 77.06,"end": 77.57}], "i": [{"start": 53.66,"end": 53.69}],
# 				"like": [{"start": 53.89, "end": 54.11}], "you": [{"start": 54.58, "end": 54.69}, {"start": 54.11, "end": 54.3}], "thank": [{"start": 87.37,"end": 87.57}]}
# 	video = "test2.mp4"
# 	wordsToTimes(input, word_bank, video)


# test()



