import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { taskListReducer } from './app/store/task-list.reducer';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideStore({ taskList: taskListReducer }),
    provideStoreDevtools({ maxAge: 25, logOnly: environment.production })
  ]
}).catch(err => console.error(err));
