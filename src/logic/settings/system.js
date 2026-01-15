export default {
    data() {
        return {
            backupSettings: {
                autoBackup: true,
                frequency: 'daily'
            },
            backupInfo: {
                lastBackup: '2026-01-15 03:00'
            },
            restoreFile: '',
            backupFiles: [
                { id: 1, date: '2026-01-15 03:00', size: '2.5GB' },
                { id: 2, date: '2026-01-14 03:00', size: '2.4GB' },
                { id: 3, date: '2026-01-13 03:00', size: '2.3GB' },
                { id: 4, date: '2026-01-12 03:00', size: '2.2GB' },
                { id: 5, date: '2026-01-11 03:00', size: '2.1GB' }
            ],
            securitySettings: {
                passwordExpiry: '90',
                sessionTimeout: '60',
                twoFactorAuth: false,
                loginNotification: true,
                ipRestriction: false
            },
            systemLogs: [
                { id: 1, timestamp: '2026-01-15 14:32', type: 'INFO', user: '김관리', message: '사용자 로그인' },
                { id: 2, timestamp: '2026-01-15 14:15', type: 'INFO', user: '이강사', message: '학생 정보 수정' },
                { id: 3, timestamp: '2026-01-15 13:20', type: 'WARNING', user: 'system', message: '디스크 사용량 80% 초과' },
                { id: 4, timestamp: '2026-01-15 10:45', type: 'INFO', user: '박선생', message: '출석 체크' },
                { id: 5, timestamp: '2026-01-15 09:30', type: 'INFO', user: '최직원', message: '수강료 납부 처리' },
                { id: 6, timestamp: '2026-01-15 03:00', type: 'SUCCESS', user: 'system', message: '자동 백업 완료' },
                { id: 7, timestamp: '2026-01-14 18:20', type: 'ERROR', user: 'system', message: '이메일 발송 실패' },
                { id: 8, timestamp: '2026-01-14 16:45', type: 'INFO', user: '김관리', message: '공지사항 등록' }
            ],
            systemInfo: {
                version: 'v1.0.0',
                database: 'MySQL 8.0',
                os: 'Ubuntu 22.04 LTS',
                lastUpdate: '2026-01-10',
                uptime: '15일 8시간',
                license: 'Professional (만료: 2026-12-31)'
            }
        };
    },

    computed: {
        stats() {
            return {
                storage: 2.8,
                lastBackup: '1일 전',
                logSize: 156,
                status: 'normal'
            };
        }
    },

    methods: {
        backupNow() {
            if (confirm('데이터를 백업하시겠습니까?\n백업 중에는 시스템이 느려질 수 있습니다.')) {
                alert('백업이 시작되었습니다.\n완료되면 알림을 보내드립니다.');

                // 실제로는 백업 API 호출
                setTimeout(() => {
                    this.backupInfo.lastBackup = new Date().toISOString().slice(0, 16).replace('T', ' ');
                    const newBackup = {
                        id: this.backupFiles.length + 1,
                        date: this.backupInfo.lastBackup,
                        size: '2.6GB'
                    };
                    this.backupFiles.unshift(newBackup);

                    // 로그 추가
                    this.systemLogs.unshift({
                        id: this.systemLogs.length + 1,
                        timestamp: this.backupInfo.lastBackup,
                        type: 'SUCCESS',
                        user: 'system',
                        message: '수동 백업 완료'
                    });
                }, 100);
            }
        },

        restoreData() {
            const selectedBackup = this.backupFiles.find(b => b.id === this.restoreFile);
            if (!selectedBackup) {
                alert('백업 파일을 선택해주세요.');
                return;
            }

            if (confirm(`${selectedBackup.date} 백업으로 복원하시겠습니까?\n현재 데이터는 모두 삭제됩니다.`)) {
                alert('데이터 복원이 시작되었습니다.\n완료되면 자동으로 로그아웃됩니다.');

                // 실제로는 복원 API 호출
                this.systemLogs.unshift({
                    id: this.systemLogs.length + 1,
                    timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
                    type: 'SUCCESS',
                    user: 'system',
                    message: `데이터 복원 완료 (${selectedBackup.date})`
                });
            }
        },

        saveSecuritySettings() {
            console.log('보안 설정 저장:', this.securitySettings);

            // 실제로는 API 호출
            alert('보안 설정이 저장되었습니다.');

            // 로그 추가
            this.systemLogs.unshift({
                id: this.systemLogs.length + 1,
                timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
                type: 'INFO',
                user: '김관리',
                message: '보안 설정 변경'
            });
        },

        refreshLogs() {
            console.log('로그 새로고침');

            // 실제로는 API 호출하여 최신 로그 가져오기
            alert('로그가 새로고침되었습니다.');
        },

        clearLogs() {
            if (confirm('모든 로그를 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.')) {
                this.systemLogs = [
                    {
                        id: 1,
                        timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
                        type: 'INFO',
                        user: 'system',
                        message: '로그 초기화'
                    }
                ];
                alert('로그가 삭제되었습니다.');
            }
        },

        getLogTypeBadgeClass(type) {
            const classes = {
                'INFO': 'bg-primary',
                'SUCCESS': 'bg-success',
                'WARNING': 'bg-warning',
                'ERROR': 'bg-danger'
            };
            return classes[type] || 'bg-secondary';
        },

        checkUpdate() {
            alert('최신 버전을 사용 중입니다.');

            // 실제로는 업데이트 서버 확인
            this.systemLogs.unshift({
                id: this.systemLogs.length + 1,
                timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
                type: 'INFO',
                user: 'system',
                message: '업데이트 확인 완료 (최신 버전)'
            });
        }
    },

    mounted() {
        console.log('시스템 설정 페이지 로드됨');
    }
};
