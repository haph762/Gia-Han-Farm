import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../_core/_services/auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AlertUtilityService } from '../../_core/_services/alert-utility.service';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let authService: AuthService;
    let httpMock: HttpTestingController;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                ReactiveFormsModule,
                FormsModule
            ],
            declarations: [LoginComponent],
            providers: [AuthService, AlertUtilityService,
                { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
                SnotifyService]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        authService = TestBed.inject(AuthService);
        httpMock = TestBed.inject(HttpTestingController);
        fixture.detectChanges();
    });
    afterEach(() => {
        httpMock.verify();
        localStorage.clear();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call the login method', () => {
        const mockResponse = { token: 'token' };
        authService.login('username', 'password').subscribe();

        const req = httpMock.expectOne('http://localhost:5000/api/Auth/login');
        expect(req.request.method).toBe('POST');
        req.flush(mockResponse);

        expect(localStorage.getItem('token')).toEqual(mockResponse.token);
    });
});

