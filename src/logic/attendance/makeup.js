export default {
    data() {
        return {
            // 검색 및 필터
            searchKeyword: '',
            filters: {
                status: '',
                classId: '',
                period: 'all'
            },
            sortBy: 'date',

            // 통계
            stats: {
                pending: 8,
                scheduled: 12,
                completed: 45,
                thisWeek: 5
            },

            // 보강 목록
            makeups: [
                {
                    id: 1,
                    studentId: 1,
                    studentName: '김철수',
                    grade: '고1',
                    classId: 1,
                    className: '고등수학 심화반',
                    absentDate: '2024-12-10',
                    makeupDate: '2024-12-22',
                    makeupTime: '14:00',
                    status: 'scheduled',
                    requestDate: '2024-12-11',
                    teacher: '박선생',
                    reason: 'sick',
                    memo: '독감으로 결석'
                },
                {
                    id: 2,
                    studentId: 2,
                    studentName: '이영희',
                    grade: '중2',
                    classId: 2,
                    className: '중등영어 기초반',
                    absentDate: '2024-12-15',
                    makeupDate: '',
                    makeupTime: '',
                    status: 'pending',
                    requestDate: '2024-12-16',
                    teacher: '이선생',
                    reason: 'family',
                    memo: '가족 여행'
                },
                {
                    id: 3,
                    studentId: 3,
                    studentName: '박민수',
                    grade: '고3',
                    classId: 3,
                    className: '고등물리 심화반',
                    absentDate: '2024-12-05',
                    makeupDate: '2024-12-18',
                    makeupTime: '16:00',
                    status: 'completed',
                    requestDate: '2024-12-06',
                    teacher: '최선생',
                    reason: 'school',
                    memo: '학교 행사'
                },
                {
                    id: 4,
                    studentId: 4,
                    studentName: '최지훈',
                    grade: '중1',
                    classId: 4,
                    className: '중등수학 중급반',
                    absentDate: '2024-12-12',
                    makeupDate: '2024-12-23',
                    makeupTime: '15:00',
                    status: 'scheduled',
                    requestDate: '2024-12-13',
                    teacher: '박선생',
                    reason: 'sick',
                    memo: ''
                },
                {
                    id: 5,
                    studentId: 5,
                    studentName: '정수진',
                    grade: '고2',
                    classId: 1,
                    className: '고등수학 심화반',
                    absentDate: '2024-12-18',
                    makeupDate: '',
                    makeupTime: '',
                    status: 'pending',
                    requestDate: '2024-12-19',
                    teacher: '박선생',
                    reason: 'etc',
                    memo: '개인 사정'
                }
            ],

            // 보강 신청 모달
            showMakeupModal: false,
            makeupData: {
                studentId: '',
                classId: '',
                absentDate: '',
                reason: '',
                memo: ''
            },

            // 보강 일정 등록 모달
            showScheduleModal: false,
            scheduleData: {
                id: null,
                studentName: '',
                grade: '',
                className: '',
                absentDate: '',
                makeupDate: '',
                makeupTime: '',
                teacherId: '',
                memo: ''
            }
        };
    },

    computed: {
        // 필터링된 보강 목록
        filteredMakeups() {
            let filtered = this.makeups;

            // 검색어 필터
            if (this.searchKeyword) {
                const keyword = this.searchKeyword.toLowerCase();
                filtered = filtered.filter(makeup =>
                    makeup.studentName.toLowerCase().includes(keyword)
                );
            }

            // 상태 필터
            if (this.filters.status) {
                filtered = filtered.filter(makeup => makeup.status === this.filters.status);
            }

            // 수업 필터
            if (this.filters.classId) {
                filtered = filtered.filter(makeup => makeup.classId == this.filters.classId);
            }

            // 기간 필터
            if (this.filters.period !== 'all') {
                const today = new Date();
                filtered = filtered.filter(makeup => {
                    if (!makeup.makeupDate) return false;
                    const makeupDate = new Date(makeup.makeupDate);

                    switch (this.filters.period) {
                        case 'upcoming':
                            return makeupDate >= today;
                        case 'week':
                            const weekLater = new Date(today);
                            weekLater.setDate(today.getDate() + 7);
                            return makeupDate >= today && makeupDate <= weekLater;
                        case 'month':
                            return makeupDate.getMonth() === today.getMonth() &&
                                   makeupDate.getFullYear() === today.getFullYear();
                        default:
                            return true;
                    }
                });
            }

            // 정렬
            filtered.sort((a, b) => {
                switch (this.sortBy) {
                    case 'date':
                        if (!a.makeupDate) return 1;
                        if (!b.makeupDate) return -1;
                        return new Date(a.makeupDate) - new Date(b.makeupDate);
                    case 'request':
                        return new Date(b.requestDate) - new Date(a.requestDate);
                    case 'name':
                        return a.studentName.localeCompare(b.studentName);
                    default:
                        return 0;
                }
            });

            return filtered;
        }
    },

    mounted() {
        // 보강 목록 로드
        this.loadMakeups();
    },

    methods: {
        // 보강 목록 로드
        async loadMakeups() {
            // 실제로는 API 호출
            // const response = await this.$api.get('/api/attendance/makeup');
            // this.makeups = response.data.makeups;
            // this.stats = response.data.stats;

            console.log('보강 목록 로드 완료');
        },

        // 검색 처리
        handleSearch() {
            // 검색어 변경 시 실시간 필터링 (computed에서 처리)
        },

        // 필터 처리
        handleFilter() {
            // 필터 변경 시 실시간 필터링 (computed에서 처리)
        },

        // 정렬 처리
        handleSort() {
            // 정렬 변경 시 실시간 정렬 (computed에서 처리)
        },

        // 필터 초기화
        resetFilters() {
            this.searchKeyword = '';
            this.filters = {
                status: '',
                classId: '',
                period: 'all'
            };
            this.sortBy = 'date';
        },

        // 학생 상세보기
        viewStudent(studentId) {
            window.location.hash = `#/students/detail?id=${studentId}`;
        },

        // 보강 신청 모달 표시
        showRequestModal() {
            this.makeupData = {
                studentId: '',
                classId: '',
                absentDate: '',
                reason: '',
                memo: ''
            };
            this.showMakeupModal = true;
        },

        // 보강 신청 모달 닫기
        closeMakeupModal() {
            this.showMakeupModal = false;
            this.makeupData = {
                studentId: '',
                classId: '',
                absentDate: '',
                reason: '',
                memo: ''
            };
        },

        // 보강 신청 제출
        async handleMakeupSubmit() {
            try {
                // 실제로는 API 호출
                // await this.$api.post('/api/attendance/makeup', this.makeupData);

                // 목록에 추가
                const newMakeup = {
                    id: Date.now(),
                    ...this.makeupData,
                    studentName: this.getStudentName(this.makeupData.studentId),
                    grade: this.getStudentGrade(this.makeupData.studentId),
                    className: this.getClassName(this.makeupData.classId),
                    makeupDate: '',
                    makeupTime: '',
                    status: 'pending',
                    requestDate: new Date().toISOString().split('T')[0],
                    teacher: this.getTeacherName(this.makeupData.classId)
                };
                this.makeups.unshift(newMakeup);

                // 통계 업데이트
                this.stats.pending++;

                alert('보강이 신청되었습니다.');
                console.log('보강 신청:', this.makeupData);
                this.closeMakeupModal();
            } catch (error) {
                alert('오류가 발생했습니다. 다시 시도해주세요.');
                console.error(error);
            }
        },

        // 보강 일정 등록
        scheduleMakeup(makeup) {
            this.scheduleData = {
                id: makeup.id,
                studentName: makeup.studentName,
                grade: makeup.grade,
                className: makeup.className,
                absentDate: makeup.absentDate,
                makeupDate: '',
                makeupTime: '',
                teacherId: '',
                memo: makeup.memo || ''
            };
            this.showScheduleModal = true;
        },

        // 보강 일정 모달 닫기
        closeScheduleModal() {
            this.showScheduleModal = false;
            this.scheduleData = {
                id: null,
                studentName: '',
                grade: '',
                className: '',
                absentDate: '',
                makeupDate: '',
                makeupTime: '',
                teacherId: '',
                memo: ''
            };
        },

        // 보강 일정 제출
        async handleScheduleSubmit() {
            try {
                // 실제로는 API 호출
                // await this.$api.put(`/api/attendance/makeup/${this.scheduleData.id}/schedule`, this.scheduleData);

                // 목록 업데이트
                const index = this.makeups.findIndex(m => m.id === this.scheduleData.id);
                if (index > -1) {
                    this.makeups[index].makeupDate = this.scheduleData.makeupDate;
                    this.makeups[index].makeupTime = this.scheduleData.makeupTime;
                    this.makeups[index].teacher = this.getTeacherNameById(this.scheduleData.teacherId);
                    this.makeups[index].status = 'scheduled';
                    this.makeups[index].memo = this.scheduleData.memo;
                }

                // 통계 업데이트
                this.stats.pending--;
                this.stats.scheduled++;

                alert('보강 일정이 등록되었습니다.');
                console.log('보강 일정 등록:', this.scheduleData);
                this.closeScheduleModal();
            } catch (error) {
                alert('오류가 발생했습니다. 다시 시도해주세요.');
                console.error(error);
            }
        },

        // 보강 완료
        async completeMakeup(makeup) {
            if (!confirm(`${makeup.studentName} 학생의 보강을 완료 처리하시겠습니까?`)) {
                return;
            }

            try {
                // 실제로는 API 호출
                // await this.$api.put(`/api/attendance/makeup/${makeup.id}/complete`);

                // 목록 업데이트
                const index = this.makeups.findIndex(m => m.id === makeup.id);
                if (index > -1) {
                    this.makeups[index].status = 'completed';
                }

                // 통계 업데이트
                this.stats.scheduled--;
                this.stats.completed++;

                alert('보강이 완료 처리되었습니다.');
                console.log('보강 완료:', makeup.id);
            } catch (error) {
                alert('오류가 발생했습니다. 다시 시도해주세요.');
                console.error(error);
            }
        },

        // 보강 취소
        async cancelMakeup(makeup) {
            if (!confirm(`${makeup.studentName} 학생의 보강을 취소하시겠습니까?`)) {
                return;
            }

            try {
                // 실제로는 API 호출
                // await this.$api.put(`/api/attendance/makeup/${makeup.id}/cancel`);

                // 목록 업데이트
                const index = this.makeups.findIndex(m => m.id === makeup.id);
                if (index > -1) {
                    const oldStatus = this.makeups[index].status;
                    this.makeups[index].status = 'cancelled';

                    // 통계 업데이트
                    if (oldStatus === 'pending') {
                        this.stats.pending--;
                    } else if (oldStatus === 'scheduled') {
                        this.stats.scheduled--;
                    }
                }

                alert('보강이 취소되었습니다.');
                console.log('보강 취소:', makeup.id);
            } catch (error) {
                alert('오류가 발생했습니다. 다시 시도해주세요.');
                console.error(error);
            }
        },

        // 보강 상세보기
        viewDetail(makeup) {
            alert(`보강 상세 정보\n\n학생: ${makeup.studentName}\n수업: ${makeup.className}\n결석일: ${makeup.absentDate}\n보강일: ${makeup.makeupDate || '미정'}\n상태: ${this.getStatusText(makeup.status)}`);
        },

        // 학생명 가져오기
        getStudentName(studentId) {
            const students = {
                '1': '김철수',
                '2': '이영희',
                '3': '박민수',
                '4': '최지훈',
                '5': '정수진'
            };
            return students[studentId] || '알 수 없음';
        },

        // 학생 학년 가져오기
        getStudentGrade(studentId) {
            const grades = {
                '1': '고1',
                '2': '중2',
                '3': '고3',
                '4': '중1',
                '5': '고2'
            };
            return grades[studentId] || '';
        },

        // 수업명 가져오기
        getClassName(classId) {
            const classes = {
                '1': '고등수학 심화반',
                '2': '중등영어 기초반',
                '3': '고등물리 심화반',
                '4': '중등수학 중급반'
            };
            return classes[classId] || '알 수 없음';
        },

        // 강사명 가져오기 (수업 기준)
        getTeacherName(classId) {
            const teachers = {
                '1': '박선생',
                '2': '이선생',
                '3': '최선생',
                '4': '박선생'
            };
            return teachers[classId] || '알 수 없음';
        },

        // 강사명 가져오기 (강사 ID 기준)
        getTeacherNameById(teacherId) {
            const teachers = {
                '1': '박선생',
                '2': '이선생',
                '3': '최선생',
                '4': '정선생'
            };
            return teachers[teacherId] || '알 수 없음';
        },

        // 상태 텍스트 반환
        getStatusText(status) {
            const statusMap = {
                pending: '대기중',
                scheduled: '예정됨',
                completed: '완료',
                cancelled: '취소'
            };
            return statusMap[status] || status;
        },

        // 상태 배지 클래스 반환
        getStatusBadgeClass(status) {
            const classMap = {
                pending: 'bg-warning',
                scheduled: 'bg-primary',
                completed: 'bg-success',
                cancelled: 'bg-secondary'
            };
            return classMap[status] || 'bg-secondary';
        }
    }
};
