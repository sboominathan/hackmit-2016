import re
from urlparse import urlparse
import urllib
import HTMLParser

def getcc(url):
    htmlpar = HTMLParser.HTMLParser()
    o = urlparse(url)
    query = re.split('=|&', o.query)
    params = [query[i] for i in range(len(query)) if i % 2 != 0]
    cc_url = "http://www.youtube.com/api/timedtext?v=" + query[1] + "&lang=en"
    cc = urllib.urlopen(cc_url).read().split("</text>")

    captions = []
    for line in cc:
        if re.search('text', line):
            start_time = re.search(r'start="(\d+)(?:\.(\d+)){0,1}', line).groups()
            dur_time = re.search(r'dur="(\d+)(?:\.(\d+)){0,1}', line).groups()

            start_time = ( float(start_time[0]) + float(0 if not start_time[1] else "."+ start_time[1]) )
            dur_time = ( float(dur_time[0]) + float(0 if not dur_time[1] else "."+ dur_time[1]) )

            text = re.search(r'">(.*)', line, re.DOTALL).group(1)
            text = [ htmlpar.unescape(htmlpar.unescape( unicode(lineunparsed,"utf-8") )) for lineunparsed in text.split('\n') ]

            times = {"start time": start_time, "duration": dur_time}
            captions.append({'times':times,'line':text})
            
    return captions