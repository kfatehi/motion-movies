# motion-movies

The webcam software `motion` creates avi files which are no good for HTML5 video.

To make the movies more useful, `motion-movies` runs a web server that can:

* transcode movies automatically
* produce a json index of movies

Assuming your movies are in /Volumes/service/cameras start it up with:

```
./server --dir /Volumes/service/cameras
```

## Dependencies

* node
* ffmpeg

## Getting ffmpeg

### mac

`brew install ffmpeg`

### ubuntu

```
sudo add-apt-repository ppa:kirillshkrogalev/ffmpeg-next
sudo apt-get update
sudo apt-get install ffmpeg
```
