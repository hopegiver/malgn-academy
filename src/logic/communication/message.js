export default {
    data() {
        return {
            filters: {
                type: '',
                status: '',
                date: ''
            },
            messages: [
                {
                    id: 25,
                    type: 'kakao',
                    title: '신학기 수강료 납부 안내',
                    content: '안녕하세요. 신학기 수강료 납부 기한이 다가왔습니다. 1월 20일까지 납부 부탁드립니다.',
                    recipientType: '전체',
                    recipientCount: 145,
                    sentAt: '2026-01-15 09:00',
                    status: 'success'
                },
                {
                    id: 24,
                    type: 'sms',
                    title: '출석 확인',
                    content: '오늘 수업에 출석하지 않으셨습니다. 다음 수업 참석 부탁드립니다.',
                    recipientType: '학생',
                    recipientCount: 8,
                    sentAt: '2026-01-15 15:30',
                    status: 'pending'
                },
                {
                    id: 23,
                    type: 'kakao',
                    title: '수업 일정 변경 안내',
                    content: '금주 금요일 수업이 목요일로 변경되었습니다. 참고 부탁드립니다.',
                    recipientType: '재원생',
                    recipientCount: 32,
                    sentAt: '2026-01-14 10:00',
                    status: 'success'
                },
                {
                    id: 22,
                    type: 'sms',
                    title: '설 연휴 휴무 안내',
                    content: '설 연휴 기간(1/28~2/2) 학원 휴무 안내드립니다. 2/3부터 정상 운영합니다.',
                    recipientType: '전체',
                    recipientCount: 150,
                    sentAt: '2026-01-13 14:00',
                    status: 'success'
                },
                {
                    id: 21,
                    type: 'kakao',
                    title: '겨울방학 특강 안내',
                    content: '겨울방학 특강 신청이 시작되었습니다. 홈페이지에서 신청 가능합니다.',
                    recipientType: '학부모',
                    recipientCount: 120,
                    sentAt: '2026-01-12 11:00',
                    status: 'failed',
                    failReason: '일부 수신자 번호 오류'
                },
                {
                    id: 20,
                    type: 'sms',
                    title: '모의고사 일정 안내',
                    content: '1월 모의고사가 1/18(토) 오전 9시에 진행됩니다. 시간 엄수 부탁드립니다.',
                    recipientType: '고등부',
                    recipientCount: 45,
                    sentAt: '2026-01-11 16:00',
                    status: 'success'
                },
                {
                    id: 19,
                    type: 'kakao',
                    title: '학부모 상담 안내',
                    content: '1월 학부모 상담 일정을 안내드립니다. 개별 연락 예정입니다.',
                    recipientType: '학부모',
                    recipientCount: 85,
                    sentAt: '2026-01-10 13:30',
                    status: 'success'
                },
                {
                    id: 18,
                    type: 'sms',
                    title: '교재 배부 안내',
                    content: '신학기 교재 배부가 시작되었습니다. 수업 시간에 수령해주세요.',
                    recipientType: '학생',
                    recipientCount: 140,
                    sentAt: '2026-01-09 10:00',
                    status: 'success'
                }
            ],
            selectedMessage: null,
            sendForm: {
                type: 'sms',
                recipientType: 'all',
                customRecipients: '',
                template: '',
                title: '',
                content: '',
                scheduleType: 'immediate',
                scheduledAt: ''
            },
            templates: {
                attendance: {
                    title: '출석 확인',
                    content: '[학원명] 안녕하세요. 오늘 수업에 출석하지 않으셨습니다. 다음 수업 참석 부탁드립니다.'
                },
                payment: {
                    title: '수강료 납부 안내',
                    content: '[학원명] 이번 달 수강료 납부 기한이 다가왔습니다. 기한 내 납부 부탁드립니다.'
                },
                schedule: {
                    title: '수업 일정 안내',
                    content: '[학원명] 수업 일정을 안내드립니다. 자세한 내용은 학원 공지사항을 확인해주세요.'
                },
                holiday: {
                    title: '휴무 안내',
                    content: '[학원명] 휴무 일정을 안내드립니다. 휴무 기간 중 문의사항은 이메일로 부탁드립니다.'
                }
            }
        };
    },

    computed: {
        stats() {
            const thisMonth = new Date().getMonth();
            const thisMonthMessages = this.messages.filter(m => {
                const msgMonth = new Date(m.sentAt).getMonth();
                return msgMonth === thisMonth;
            });

            return {
                total: thisMonthMessages.length,
                success: thisMonthMessages.filter(m => m.status === 'success').length,
                failed: thisMonthMessages.filter(m => m.status === 'failed').length,
                pending: thisMonthMessages.filter(m => m.status === 'pending').length
            };
        },

        filteredMessages() {
            let result = this.messages;

            // 유형 필터
            if (this.filters.type) {
                result = result.filter(msg => msg.type === this.filters.type);
            }

            // 상태 필터
            if (this.filters.status) {
                result = result.filter(msg => msg.status === this.filters.status);
            }

            // 날짜 필터
            if (this.filters.date) {
                result = result.filter(msg => msg.sentAt.startsWith(this.filters.date));
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
                'sms': 'SMS',
                'kakao': '알림톡'
            };
            return types[type] || type;
        },

        getTypeBadgeClass(type) {
            const classes = {
                'sms': 'bg-primary',
                'kakao': 'bg-warning'
            };
            return classes[type] || 'bg-secondary';
        },

        getStatusText(status) {
            const statuses = {
                'pending': '대기중',
                'success': '성공',
                'failed': '실패'
            };
            return statuses[status] || status;
        },

        getStatusBadgeClass(status) {
            const classes = {
                'pending': 'bg-warning',
                'success': 'bg-success',
                'failed': 'bg-danger'
            };
            return classes[status] || 'bg-secondary';
        },

        viewMessage(message) {
            this.selectedMessage = message;
            const modal = new bootstrap.Modal(document.getElementById('detailModal'));
            modal.show();
        },

        showSendModal() {
            // 폼 초기화
            this.sendForm = {
                type: 'sms',
                recipientType: 'all',
                customRecipients: '',
                template: '',
                title: '',
                content: '',
                scheduleType: 'immediate',
                scheduledAt: ''
            };

            const modal = new bootstrap.Modal(document.getElementById('sendModal'));
            modal.show();
        },

        applyTemplate() {
            if (this.sendForm.template && this.templates[this.sendForm.template]) {
                const template = this.templates[this.sendForm.template];
                this.sendForm.title = template.title;
                this.sendForm.content = template.content;
            }
        },

        sendMessage() {
            if (!this.sendForm.title.trim()) {
                alert('제목을 입력해주세요.');
                return;
            }

            if (!this.sendForm.content.trim()) {
                alert('내용을 입력해주세요.');
                return;
            }

            if (this.sendForm.scheduleType === 'scheduled' && !this.sendForm.scheduledAt) {
                alert('예약 일시를 선택해주세요.');
                return;
            }

            // 수신자 수 계산
            let recipientCount = 0;
            let recipientTypeText = '';

            switch (this.sendForm.recipientType) {
                case 'all':
                    recipientCount = 150;
                    recipientTypeText = '전체';
                    break;
                case 'students':
                    recipientCount = 145;
                    recipientTypeText = '학생';
                    break;
                case 'parents':
                    recipientCount = 130;
                    recipientTypeText = '학부모';
                    break;
                case 'active':
                    recipientCount = 138;
                    recipientTypeText = '재원생';
                    break;
                case 'custom':
                    const numbers = this.sendForm.customRecipients.split(',').filter(n => n.trim());
                    recipientCount = numbers.length;
                    recipientTypeText = '직접선택';
                    break;
            }

            // 새 메시지 추가
            const newMessage = {
                id: this.messages.length + 1,
                type: this.sendForm.type,
                title: this.sendForm.title,
                content: this.sendForm.content,
                recipientType: recipientTypeText,
                recipientCount: recipientCount,
                sentAt: this.sendForm.scheduleType === 'immediate'
                    ? new Date().toISOString().slice(0, 16).replace('T', ' ')
                    : this.sendForm.scheduledAt.replace('T', ' '),
                status: this.sendForm.scheduleType === 'immediate' ? 'success' : 'pending'
            };

            this.messages.unshift(newMessage);

            // 모달 닫기
            const modal = bootstrap.Modal.getInstance(document.getElementById('sendModal'));
            modal.hide();

            // 성공 메시지
            if (this.sendForm.scheduleType === 'immediate') {
                alert(`메시지가 발송되었습니다. (${recipientCount}명)`);
            } else {
                alert(`메시지 발송이 예약되었습니다. (${recipientCount}명)`);
            }
        }
    },

    mounted() {
        console.log('메시지 발송 페이지 로드됨');
    }
};
