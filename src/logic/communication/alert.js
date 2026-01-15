export default {
    data() {
        return {
            filters: {
                type: '',
                status: '',
                priority: ''
            },
            alerts: [
                {
                    id: 12,
                    type: 'urgent',
                    title: '코로나19 확진자 발생 안내',
                    content: '학원 내 확진자 발생으로 인해 1월 15일~16일 임시 휴원합니다. 온라인 수업으로 대체됩니다.',
                    startDate: '2026-01-15',
                    endDate: '2026-01-16',
                    priority: 'high',
                    status: 'active'
                },
                {
                    id: 11,
                    type: 'holiday',
                    title: '설 연휴 휴무 안내',
                    content: '설 연휴 기간(1월 28일 ~ 2월 2일) 학원이 휴무입니다. 2월 3일부터 정상 운영됩니다.',
                    startDate: '2026-01-28',
                    endDate: '2026-02-02',
                    priority: 'high',
                    status: 'scheduled'
                },
                {
                    id: 10,
                    type: 'event',
                    title: '겨울방학 특강 모집',
                    content: '겨울방학 특강 수강생을 모집합니다. 1월 20일까지 신청 가능합니다.',
                    startDate: '2026-01-10',
                    endDate: '2026-01-20',
                    priority: 'normal',
                    status: 'active'
                },
                {
                    id: 9,
                    type: 'schedule',
                    title: '수업 시간 변경 안내',
                    content: '1월 17일 금요일 수업이 목요일로 변경되었습니다. 참고 부탁드립니다.',
                    startDate: '2026-01-15',
                    endDate: '2026-01-17',
                    priority: 'normal',
                    status: 'active'
                },
                {
                    id: 8,
                    type: 'event',
                    title: '학부모 상담 주간',
                    content: '1월 20일~24일은 학부모 상담 주간입니다. 개별 연락 드리겠습니다.',
                    startDate: '2026-01-20',
                    endDate: '2026-01-24',
                    priority: 'normal',
                    status: 'scheduled'
                },
                {
                    id: 7,
                    type: 'urgent',
                    title: '폭설로 인한 휴원',
                    content: '폭설로 인해 1월 5일 학원이 임시 휴원합니다.',
                    startDate: '2026-01-05',
                    endDate: '2026-01-05',
                    priority: 'high',
                    status: 'expired'
                },
                {
                    id: 6,
                    type: 'event',
                    title: '신학기 오리엔테이션',
                    content: '신학기 오리엔테이션이 1월 8일 오후 2시에 진행됩니다.',
                    startDate: '2026-01-08',
                    endDate: '2026-01-08',
                    priority: 'normal',
                    status: 'expired'
                },
                {
                    id: 5,
                    type: 'holiday',
                    title: '신정 휴무',
                    content: '1월 1일 신정으로 인해 학원이 휴무입니다.',
                    startDate: '2026-01-01',
                    endDate: '2026-01-01',
                    priority: 'high',
                    status: 'expired'
                }
            ],
            alertForm: {
                id: null,
                type: 'holiday',
                title: '',
                content: '',
                startDate: '',
                endDate: '',
                priority: 'normal',
                sendNotification: false,
                showOnHomepage: true
            }
        };
    },

    computed: {
        stats() {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const weekLater = new Date(today);
            weekLater.setDate(weekLater.getDate() + 7);

            return {
                total: this.alerts.length,
                active: this.alerts.filter(a => a.status === 'active').length,
                thisWeek: this.alerts.filter(a => {
                    const startDate = new Date(a.startDate);
                    return startDate >= today && startDate <= weekLater;
                }).length,
                scheduled: this.alerts.filter(a => a.status === 'scheduled').length
            };
        },

        filteredAlerts() {
            let result = this.alerts;

            // 유형 필터
            if (this.filters.type) {
                result = result.filter(alert => alert.type === this.filters.type);
            }

            // 상태 필터
            if (this.filters.status) {
                result = result.filter(alert => alert.status === this.filters.status);
            }

            // 중요도 필터
            if (this.filters.priority) {
                result = result.filter(alert => alert.priority === this.filters.priority);
            }

            return result;
        }
    },

    methods: {
        handleFilter() {
            // 필터 처리 (computed에서 자동 처리됨)
        },

        getTypeText(type) {
            const types = {
                'holiday': '휴무일',
                'event': '행사',
                'urgent': '긴급공지',
                'schedule': '일정변경'
            };
            return types[type] || type;
        },

        getTypeBadgeClass(type) {
            const classes = {
                'holiday': 'bg-info',
                'event': 'bg-primary',
                'urgent': 'bg-danger',
                'schedule': 'bg-warning'
            };
            return classes[type] || 'bg-secondary';
        },

        getPriorityText(priority) {
            const priorities = {
                'high': '높음',
                'normal': '보통',
                'low': '낮음'
            };
            return priorities[priority] || priority;
        },

        getPriorityBadgeClass(priority) {
            const classes = {
                'high': 'bg-danger',
                'normal': 'bg-secondary',
                'low': 'bg-light text-dark'
            };
            return classes[priority] || 'bg-secondary';
        },

        getStatusText(status) {
            const statuses = {
                'active': '활성',
                'scheduled': '예약',
                'expired': '만료'
            };
            return statuses[status] || status;
        },

        getStatusBadgeClass(status) {
            const classes = {
                'active': 'bg-success',
                'scheduled': 'bg-warning',
                'expired': 'bg-secondary'
            };
            return classes[status] || 'bg-secondary';
        },

        showAlertModal(alert) {
            if (alert) {
                // 수정 모드
                this.alertForm = {
                    id: alert.id,
                    type: alert.type,
                    title: alert.title,
                    content: alert.content,
                    startDate: alert.startDate,
                    endDate: alert.endDate,
                    priority: alert.priority,
                    sendNotification: false,
                    showOnHomepage: true
                };
            } else {
                // 등록 모드
                this.alertForm = {
                    id: null,
                    type: 'holiday',
                    title: '',
                    content: '',
                    startDate: '',
                    endDate: '',
                    priority: 'normal',
                    sendNotification: false,
                    showOnHomepage: true
                };
            }

            const modal = new bootstrap.Modal(document.getElementById('alertModal'));
            modal.show();
        },

        saveAlert() {
            if (!this.alertForm.title.trim()) {
                alert('제목을 입력해주세요.');
                return;
            }

            if (!this.alertForm.content.trim()) {
                alert('내용을 입력해주세요.');
                return;
            }

            if (!this.alertForm.startDate || !this.alertForm.endDate) {
                alert('게시 기간을 선택해주세요.');
                return;
            }

            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const startDate = new Date(this.alertForm.startDate);

            // 상태 결정
            let status = 'active';
            if (startDate > today) {
                status = 'scheduled';
            } else if (new Date(this.alertForm.endDate) < today) {
                status = 'expired';
            }

            if (this.alertForm.id) {
                // 수정
                const index = this.alerts.findIndex(a => a.id === this.alertForm.id);
                if (index !== -1) {
                    this.alerts[index] = {
                        id: this.alertForm.id,
                        type: this.alertForm.type,
                        title: this.alertForm.title,
                        content: this.alertForm.content,
                        startDate: this.alertForm.startDate,
                        endDate: this.alertForm.endDate,
                        priority: this.alertForm.priority,
                        status: status
                    };
                }
                alert('알림이 수정되었습니다.');
            } else {
                // 등록
                const newAlert = {
                    id: this.alerts.length + 1,
                    type: this.alertForm.type,
                    title: this.alertForm.title,
                    content: this.alertForm.content,
                    startDate: this.alertForm.startDate,
                    endDate: this.alertForm.endDate,
                    priority: this.alertForm.priority,
                    status: status
                };
                this.alerts.unshift(newAlert);

                if (this.alertForm.sendNotification) {
                    alert('알림이 등록되었으며, 메시지가 발송되었습니다.');
                } else {
                    alert('알림이 등록되었습니다.');
                }
            }

            // 모달 닫기
            const modal = bootstrap.Modal.getInstance(document.getElementById('alertModal'));
            modal.hide();
        },

        deleteAlert(alert) {
            if (confirm(`'${alert.title}' 알림을 삭제하시겠습니까?`)) {
                const index = this.alerts.findIndex(a => a.id === alert.id);
                if (index !== -1) {
                    this.alerts.splice(index, 1);
                    alert('알림이 삭제되었습니다.');
                }
            }
        }
    },

    mounted() {
        console.log('학원 알림 페이지 로드됨');
    }
};
