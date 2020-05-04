import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { PostService } from 'src/app/services/post/post.service';
import { IonInfiniteScroll } from '@ionic/angular';
import { SessionService } from 'src/app/services/session/session.service';
import { Post } from 'src/app/utils/models/post.models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {

 @ViewChild('infiniteScrollPosts', {static: false}) infiniteScrollPosts: IonInfiniteScroll;

  currentPage: number;
  posts: Post[] = [];
  postSubscription: Subscription;
  logoutSubscription: Subscription;

  constructor(
    private _postService: PostService,
    private _sessionService: SessionService
  ) {}

  ngOnInit() {
    this.currentPage = 1;
    this.posts = [];
    this.initPosts();
  }

  ngOnDestroy() {
    if (!!this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
    if (!!this.logoutSubscription) {
      this.logoutSubscription.unsubscribe();
    }
  }

  private async initPosts(): Promise<any> {
    await this.getPosts(this.currentPage);
    this.postSubscription = this._postService.postStream.subscribe(
      (post: Post) => {
        if (!(!!this.posts.find(postList => postList._id === post._id))) {
          this.posts.unshift(post);
        }
      }
    );
    this.logoutSubscription = this._sessionService.logoutStream.subscribe(
      async logout => {
        if (logout) {
          this.currentPage = 1;
          this.posts = [];
          await this.getPosts(this.currentPage);
        }
      }
    );
  }

  public async getPosts(currentPage: number): Promise<void> {
    await this._postService.getPosts(currentPage)
      .then(
        postResponse => {
          if (postResponse.posts.length > 0) {
            this.posts.push(...postResponse.posts);
          } else {
            this.infiniteScrollPosts.disabled = true;
          }
        }
      )
      .catch( err => { console.error(err); } );
  }

  public loadPostsNextPage(ev: any): void {
    setTimeout(() => {
      this.getPosts(++this.currentPage);
      ev.target.complete();
    }, 1000);
  }

  public doRefresh(ev: any) {
    setTimeout(() => {
      this.currentPage = 1;
      this.posts = [];
      this.infiniteScrollPosts.disabled = false;
      this.getPosts(this.currentPage);
      ev.target.complete();
    }, 1000);
  }

  public logout(): void {
    this._sessionService.logOut();
  }
}
