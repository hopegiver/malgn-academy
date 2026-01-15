export default {
    data() {
        return {
            loginForm: {
                username: '',
                password: '',
                rememberMe: false
            },
            showPassword: false,
            isLoading: false,
            showFindIdModal: false,
            showResetPasswordModal: false,
            findIdForm: {
                name: '',
                phone: ''
            },
            foundId: '',
            resetPasswordForm: {
                username: '',
                name: '',
                phone: ''
            },
            passwordReset: false,
            // 테스트용 계정 (실제로는 서버에서 검증)
            accounts: [
                { username: 'admin', password: 'admin123', name: '관리자', phone: '010-0000-0000', role: 'admin' },
                { username: 'teacher1', password: 'teacher123', name: '박선생', phone: '010-1111-2222', role: 'teacher' },
                { username: 'staff1', password: 'staff123', name: '홍직원', phone: '010-5555-6666', role: 'staff' }
            ]
        };
    },
    methods: {
        async handleLogin() {
            if (!this.loginForm.username.trim()) {
                alert('아이디를 입력해주세요.');
                return;
            }
            if (!this.loginForm.password.trim()) {
                alert('비밀번호를 입력해주세요.');
                return;
            }

            this.isLoading = true;

            // 로그인 처리 (실제로는 서버 API 호출)
            setTimeout(() => {
                const account = this.accounts.find(
                    acc => acc.username === this.loginForm.username && acc.password === this.loginForm.password
                );

                if (account) {
                    // 로그인 성공
                    if (this.loginForm.rememberMe) {
                        localStorage.setItem('rememberMe', 'true');
                        localStorage.setItem('username', this.loginForm.username);
                    } else {
                        localStorage.removeItem('rememberMe');
                        localStorage.removeItem('username');
                    }

                    // 사용자 정보 저장
                    sessionStorage.setItem('user', JSON.stringify({
                        username: account.username,
                        name: account.name,
                        role: account.role
                    }));

                    alert(`${account.name}님, 환영합니다!`);

                    // 대시보드로 이동
                    window.location.href = '#/home';
                } else {
                    // 로그인 실패
                    alert('아이디 또는 비밀번호가 올바르지 않습니다.');
                }

                this.isLoading = false;
            }, 1000);
        },
        togglePassword() {
            this.showPassword = !this.showPassword;
        },
        findId() {
            if (!this.findIdForm.name.trim()) {
                alert('이름을 입력해주세요.');
                return;
            }
            if (!this.findIdForm.phone.trim()) {
                alert('연락처를 입력해주세요.');
                return;
            }

            // 아이디 찾기 (실제로는 서버 API 호출)
            const account = this.accounts.find(
                acc => acc.name === this.findIdForm.name && acc.phone === this.findIdForm.phone
            );

            if (account) {
                this.foundId = account.username;
            } else {
                alert('일치하는 정보가 없습니다.');
                this.foundId = '';
            }
        },
        resetPassword() {
            if (!this.resetPasswordForm.username.trim()) {
                alert('아이디를 입력해주세요.');
                return;
            }
            if (!this.resetPasswordForm.name.trim()) {
                alert('이름을 입력해주세요.');
                return;
            }
            if (!this.resetPasswordForm.phone.trim()) {
                alert('연락처를 입력해주세요.');
                return;
            }

            // 비밀번호 재설정 (실제로는 서버 API 호출)
            const account = this.accounts.find(
                acc => acc.username === this.resetPasswordForm.username &&
                       acc.name === this.resetPasswordForm.name &&
                       acc.phone === this.resetPasswordForm.phone
            );

            if (account) {
                this.passwordReset = true;
                setTimeout(() => {
                    alert('임시 비밀번호가 전송되었습니다.');
                    this.showResetPasswordModal = false;
                    this.passwordReset = false;
                    this.resetPasswordForm = { username: '', name: '', phone: '' };
                }, 2000);
            } else {
                alert('일치하는 정보가 없습니다.');
                this.passwordReset = false;
            }
        }
    },
    mounted() {
        // 로그인 유지 체크
        const rememberMe = localStorage.getItem('rememberMe');
        if (rememberMe === 'true') {
            const savedUsername = localStorage.getItem('username');
            if (savedUsername) {
                this.loginForm.username = savedUsername;
                this.loginForm.rememberMe = true;
            }
        }

        console.log('로그인 페이지 로드됨');
        console.log('테스트 계정:');
        console.log('- admin / admin123 (관리자)');
        console.log('- teacher1 / teacher123 (강사)');
        console.log('- staff1 / staff123 (직원)');
    }
};
