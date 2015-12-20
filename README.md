# mobservable-react-perf-test
a simple perf test using mobservable

<img width="504" alt="screen shot 2015-12-20 at 12 13 18 pm" src="https://cloud.githubusercontent.com/assets/232036/11919264/5ba5634a-a713-11e5-8179-b06030b16dbd.png">


## Run It
 ```js
 npm install
 npm start
 open http://localhost:3000
 ```
## What is it
The basic idea here is to exercise the state updating mechanism as much as possible in the context of still updating the view. 

It basically sets up lots (10,000 in the largest case) of little squares in a grid and randomly picks one to toggle on or off. 
You can start or stop the process and pick different sizes for the grid. Which are good ways to see how changes in array length are handled.

The 100 x 100 grid is the main show here and illustrates weather or not the change observation, subscription and rendering mechanisms all scale well or not.
 
# Other Implementations
This test was initially developed for improving [Omniscinet](http://omniscientjs.github.io/) via [Immstruct PR #56](https://github.com/omniscientjs/immstruct/pull/56)
 that work also lead into the development of [Omnistate](https://github.com/andrewluetgers/omnistate) which is very similar in philosophy though not syntax to Mobservable.
 The Mobservable and Omnistate examples show very similar performance (~118 fps) these test implementations are implemented with very similar code. 
 A vanilla-js implementation is coming soon.
 
## Cross Browser Performance Bug
There are some issues related to this specific perf test filed against [Firefox #1220429](https://bugzilla.mozilla.org/show_bug.cgi?id=1220429)
 and [Chromium #550044](https://code.google.com/p/chromium/issues/detail?id=550044) which register much lower frame-rates (~40)
 than Safari (~118). This appears to be a problem related to specifics of how the various graphics pipelines are implemented in these browsers.
