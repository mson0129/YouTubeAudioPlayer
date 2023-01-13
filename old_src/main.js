const { app, BrowserWindow, ipcMain, globalShortcut, Notification } = require('electron');
const ytdl = require('ytdl-core');
const appDataPath = app.getPath('appData');
const request = require("request")

function check_src_alive(src) {
    //if src is alive, it returns true.
    const promise = new Promise((resolve, reject) => {
        request.head(url).on("response", (res) => {
            resolve(res.statusCode.toString()[0] === "2")
        });
    });
    return promise;
}

function get_youtube_info(vid) {

}

async function update_youtube_src(vid) {
    const info = await ytdl.getInfo(vid, {lang: 'ko'});
    const format = ytdl.chooseFormat(info.formats, { quality: '140' });
    return promise;
}


class Item {
    type = false; //local file, youtube vid, web url
    title = '';
    artist = ''; //youtube channel
    album = ''; //youtube playlist
    mime_type = '';
    duration = '';
    uid = false;
    src = '';
    vid = ''; //youtube video id
    video_url = ''; //youtube video url
    thumbnail_url = '';

    async get_src() {
        const prom = () => new Promise((resolve, reject) => {
            //is src still valid?
            if (this.type == 'youtube') {
                request.head(url).on("response", (res) => resolve(res.statusCode.toString()[0] === "2"))
            }

            resolve(this.src);
        });

        return prom;


        if (type == 'youtube') {
            //is src still valid?
            //e.g. https://www.youtube.com/watch?v=_Swwnu3ohpM
            //https://r3---sn-n3cgv5qc5oq-bh2sy.googlevideo.com/videoplayback?expire=1633193232&ei=sDhYYfKuBfmz2roP2aeT6AM&ip=222.232.203.164&id=o-AONm9jBYPPR47M-z_7Ugpofz-UOr8HdYI0zTRGLsjAcn&itag=140&source=youtube&requiressl=yes&mh=JB&mm=31%2C26&mn=sn-n3cgv5qc5oq-bh2sy%2Csn-oguesnze&ms=au%2Conr&mv=m&mvi=3&pcm2cms=yes&pl=24&initcwndbps=1287500&vprv=1&mime=audio%2Fmp4&ns=9isuH9JvsvCP_HVfMhDo0s8G&gir=yes&clen=3293399&dur=203.453&lmt=1587983056120976&mt=1633171002&fvip=3&keepalive=yes&fexp=24001373%2C24007246&c=WEB&txp=5531432&n=JG7OaBf0NXuYV4FG&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpcm2cms%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRQIgQLuHpE984rVLWltZbxqW9f0k_njeeIlIs9Zhd6SF6KsCIQCiQEImWPvHKhSLkCm6VskpPAVtLx-hvoTTzO-yXOSfTA%3D%3D&ratebypass=yes&sig=AOq0QJ8wRQIgeRwmGXu0KEkmcWOu_RLSmto5BeazfRBfLn4mSXGYvp8CIQCtalDoo2lmZ7ZUImrvNckmduIixLw12FTsGqAqU-_tVQ%3D%3D
            //https://r5---sn-n3cgv5qc5oq-bh2ld.googlevideo.com/videoplayback?expire=1633204019&ei=02JYYcbyM9GvgQOrwZWYCw&ip=222.232.203.164&id=o-APqqfi-X5nfyuyAkaeJE-jNE0ojoUxNPk0z0fFhtzdTY&itag=140&source=youtube&requiressl=yes&mh=K-&mm=31%2C26&mn=sn-n3cgv5qc5oq-bh2ld%2Csn-ogueln7y&ms=au%2Conr&mv=m&mvi=5&pl=24&initcwndbps=1363750&vprv=1&mime=audio%2Fmp4&ns=jbNGUrRwRScsSVvvPH3XdfwG&gir=yes&clen=328320&dur=20.224&lmt=1605795472786661&mt=1633182044&fvip=5&keepalive=yes&fexp=24001373%2C24007246&beids=9466588&c=WEB&txp=5432434&n=LQuEwj8g5StjoCjY&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRQIgIdknZVhbPfCPwCaLV88pzaZXHEUQUTOIoFa2eKBXw_MCIQDFnNkGusPKbnCMnVGYkCQJGDBESBYVKh7M_vthTphdiQ%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRQIhAJH11rLiFh4L49m39soxVn1ZR_2c-Zy5DeNLRI5OYaiBAiAx3eAnbrLRp9NF9MxWI-5fZ1Q6xryHYffrljaGwsWT3w%3D%3D&ratebypass=yes
            const urlExists = url => new Promise((resolve, reject) => request.head(url).on("response", res => resolve(res.statusCode.toString()[0] === "2")))
            urlExists(this.src).then(exists => {
                if (!exists) {
                    const info = ytdl.getInfo(this.vid, {lang: 'ko'});
                    return info;
                }
            }).then((info) => {
                let format = ytdl.chooseFormat(info.formats, { quality: '140' });
                this.src = format.url;
            });
        }
        return this.src;
    }
}

class Player {
    src = false;
    muted = false;
    paused = true;
    loop = false;
    current_time = false;
    duration = 0;
    volume = 1;
    last_playing_uid = false;
    now_playing_list = [];

    append_item(item) {
        console.log(item);
        this.now_playing_list.push(item);
    }

    remove_item() {
        this.now_playing_list;
    }

    prev() {}

    next() {}

    get items() {
        return this.now_playing_list;
    }
}
const player = new Player();

function createMainWindow() {
    const win = new BrowserWindow({
        width: 300,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.loadFile('app/index.html');
    //win.webContents.openDevTools(); //Debug

    return win;
}

function createPlayerWindow() {
    const win = new BrowserWindow({
        //show: false,
        width: 400,
        height: 400,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    win.loadFile('app/player.html');

    return win;
}

app.setName('Audio Player');

let mainWindow, playerWindow;
app.whenReady().then(() => {
    mainWindow = createMainWindow();
    playerWindow = createPlayerWindow();

    //Media Previous Track
    const mediakey_prev_track = globalShortcut.register('MediaPreviousTrack', () => {
        //Send src of previous track
    });
    //Media Next Track
    const mediakey_next_track = globalShortcut.register('MediaNextTrack', () => {
        //Send src of next track
    });

    //Item stop
    const mediakey_stop = globalShortcut.register('MediaStop', () => {
        playerWindow.webContents.send('control_player', 'stop');
    });
    //Item Play/Pause
    const mediakey_play = globalShortcut.register('MediaPlayPause', () => { 
        if (player.paused) {
            playerWindow.webContents.send('control_player', 'play');
        } else {
            playerWindow.webContents.send('control_player', 'pause');
        }
    });

    //macOS Support
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length == 1)
            mainWindow = createMainWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        app.quit();
});

app.on('will-quit', () => {
    //Unregister Media Global Shortcut Keys
    globalShortcut.unregisterAll();
});

ipcMain.on('update_player_status', (event, payload) => {
    player.src = payload.src;
    player.paused = payload.paused;
    player.loop = payload.loop;
    player.current_time = payload.current_time;
    player.duration = payload.duration;
    player.muted = payload.muted;
    player.volume = payload.volume;
    console.log(player);
});

ipcMain.on('get_next_item', (event) => {
    player.now_playing_list.forEach(now_playing_item => {
        if (now_playing_item.uid == player.last_playing_uid) {
            now_playing_item_index = player.now_playing_list.indexOf(now_playing_item);
            if (now_playing_item_index == player.now_playing_list.length - 1) {
                //End Of List
                if (player.loop == 'all') {
                    player.last_playing_uid = player.now_playing_list[0].uid;
                    if (!mainWindow.isFocused()) {
                        new Notification({ title: player.now_playing_list[0].title, body: player.now_playing_list[0].artist, silent: true }).show();
                    }
                    playerWindow.webContents.send('set_player_media', player.now_playing_list[0].src);
                    playerWindow.webContents.send('control_player', 'play');
                } else {
                    event.reply('control_player', 'stop');
                }
            } else {
                player.last_playing_uid = player.now_playing_list[now_playing_item_index + 1].uid;
                /*
                //https://stackoverflow.com/questions/55474279/how-to-find-if-electron-app-is-in-foreground/55476633
                if (!mainWindow.isFocused()) {
                    new Notification({ title: player.now_playing_list[now_playing_item_index + 1].title, body: player.now_playing_list[now_playing_item_index + 1].artist, silent: true }).show();
                }
                */
                new Notification({ title: player.now_playing_list[now_playing_item_index + 1].title, body: player.now_playing_list[now_playing_item_index + 1].artist, silent: true }).show();

                player.now_playing_list[now_playing_item_index + 1].get_src()

                playerWindow.webContents.send('set_player_media', player.now_playing_list[now_playing_item_index + 1].src);
                playerWindow.webContents.send('control_player', 'play');
            }
        }
    });
});

ipcMain.on('add_item', (event, src) => {
    const item = new Item();
    if (ytdl.validateURL(src) || ytdl.validateID(src)) {
        //YouTube
        const prom = new Promise((resolve, reject) => {
            const info = ytdl.getInfo(
                src,
                {lang: 'ko'}
            );
            resolve(info);
        })
        prom.then((info) => {
            let format = ytdl.chooseFormat(info.formats, { quality: '140' });
            item.type = 'youtube';
            item.title = info.videoDetails.title;
            item.artist = info.videoDetails.ownerChannelName;
            //this.album = 
            item.mime_type = format.mimeType;
            item.duration = info.videoDetails.lengthSeconds;
            item.uid = Math.random().toString(36).replace(/[^a-z]+/g, '');
            item.src = format.url;
            item.vid = info.videoDetails.videoId
            item.video_url = info.videoDetails.video_url;
            item.thumbnail_url = info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1].url;
            player.append_item(item);
            if (player.paused === true) {
                player.last_playing_uid = item.uid;
                playerWindow.webContents.send('set_player_media', item.src);
                playerWindow.webContents.send('control_player', 'play');
            }
        });
    } else {

    }
});

ipcMain.on('get_items', (event) => {
    console.log(player.items);
});

//console.log('1', test('https://r5---sn-n3cgv5qc5oq-bh2ld.googlevideo.com/videoplayback?expire=1633204019&ei=02JYYcbyM9GvgQOrwZWYCw&ip=222.232.203.164&id=o-APqqfi-X5nfyuyAkaeJE-jNE0ojoUxNPk0z0fFhtzdTY&itag=140&source=youtube&requiressl=yes&mh=K-&mm=31%2C26&mn=sn-n3cgv5qc5oq-bh2ld%2Csn-ogueln7y&ms=au%2Conr&mv=m&mvi=5&pl=24&initcwndbps=1363750&vprv=1&mime=audio%2Fmp4&ns=jbNGUrRwRScsSVvvPH3XdfwG&gir=yes&clen=328320&dur=20.224&lmt=1605795472786661&mt=1633182044&fvip=5&keepalive=yes&fexp=24001373%2C24007246&beids=9466588&c=WEB&txp=5432434&n=LQuEwj8g5StjoCjY&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRQIgIdknZVhbPfCPwCaLV88pzaZXHEUQUTOIoFa2eKBXw_MCIQDFnNkGusPKbnCMnVGYkCQJGDBESBYVKh7M_vthTphdiQ%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRQIhAJH11rLiFh4L49m39soxVn1ZR_2c-Zy5DeNLRI5OYaiBAiAx3eAnbrLRp9NF9MxWI-5fZ1Q6xryHYffrljaGwsWT3w%3D%3D&ratebypass=yes'));
//console.log('2', test('https://r5---sn-n3cgv5qc5oq-bh2ld.googlevideo.com/videoplayback?expire=1633247622&ei=Jg1ZYY6gMpGllQSBpZLoCg&ip=222.232.203.164&id=o-AL-2OvYQL__x1KkQmmfDhL-h8ig83KPkSS7y3V-9OaBW&itag=140&source=youtube&requiressl=yes&mh=K-&mm=31%2C26&mn=sn-n3cgv5qc5oq-bh2ld%2Csn-ogul7n76&ms=au%2Conr&mv=m&mvi=5&pl=24&initcwndbps=1460000&vprv=1&mime=audio%2Fmp4&ns=rCk9B3WMCWfWx93vbKlXf_QG&gir=yes&clen=328320&dur=20.224&lmt=1605795472786661&mt=1633225719&fvip=5&keepalive=yes&fexp=24001373%2C24007246&beids=9466586&c=WEB&txp=5432434&n=R963NpQB78RM-QxT&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRQIgbCxLbI7xAg1GxcHQVsqqP3beijluCEj06JAAwZD1byECIQCn3erwRT3_7GLOgryzR3quobvuC35ej5Uz8zGBw-jIEA%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRAIgHaVRaSHaXjgmCHnX0M5QaVO8eInbuOSfTd48IdAYexcCIDD2YAqhag5tUz4zG915-6kNmbhsjh4zghlbMMDMnAoH&ratebypass=yes'));
//console.log('3', test('/Users/michaelson/Music/iTunes/iTunes Media/Music/라헬/완전한 사랑'))