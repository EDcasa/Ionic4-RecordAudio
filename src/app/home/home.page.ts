import { Component, ViewChild } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('myAudio') myAudio: any;
  recording: boolean = false;
  filePath: string;
  fileName: string;
  audio: MediaObject;
  audioList: any[] = [];
  

  constructor(public navCtrl: NavController,
    private media: Media,
    private file: File,
    public platform: Platform) { }

    ionViewWillEnter() {
      this.getAudioList();
    }
  
    getAudioList() {
      if(localStorage.getItem("audiolist")) {
        this.audioList = JSON.parse(localStorage.getItem("audiolist"));
        console.log(this.audioList);
      }
    }

    startRecord() {
      if (this.platform.is('ios')) {
        this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.3gp';
        this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.fileName;
        this.audio = this.media.create(this.filePath);
      } else if (this.platform.is('android')) {
        this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.3gp';
        this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
        this.audio = this.media.create(this.filePath);
      }
      this.audio.startRecord();
      this.recording = true;
    }

    stopRecord() {
      this.audio.stopRecord();
      let data = { filename: this.fileName };
      this.audioList.push(data);
      localStorage.setItem("audiolist", JSON.stringify(this.audioList));
      this.recording = false;
      this.getAudioList();
    }

    playAudio(file,idx) {
      console.log("audio",this.myAudio);
      console.log("audio other", file)
      if (this.platform.is('ios')) {
        this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + file;
        this.audio = this.media.create(this.filePath);
      } else if (this.platform.is('android')) {
        this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + file;
        this.audio = this.media.create(this.filePath);
      }
      this.audio.play();
      this.audio.setVolume(0.8);
    }

}
