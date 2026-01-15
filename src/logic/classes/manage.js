export default {
    data() {
        return {
            // 검색 및 필터
            searchKeyword: '',
            filters: {
                subject: '',
                status: ''
            },

            // 통계
            stats: {
                total: 28,
                active: 18,
                scheduled: 6,
                totalStudents: 245
            },

            // 수업 목록
            classes: [
                {
                    id: 1,
                    name: '고등수학 심화반',
                    subject: 'math',
                    level: '심화반',
                    teacher: '박선생',
                    schedule: '월/수/금',
                    time: '18:00-20:00',
                    currentStudents: 15,
                    maxStudents: 20,
                    fee: 350000,
                    status: 'active'
                },
                {
                    id: 2,
                    name: '중등영어 기초반',
                    subject: 'english',
                    level: '기초반',
                    teacher: '이선생',
                    schedule: '화/목',
                    time: '17:00-19:00',
                    currentStudents: 12,
                    maxStudents: 15,
                    fee: 280000,
                    status: 'active'
                },
                {
                    id: 3,
                    name: '고등물리 심화반',
                    subject: 'science',
                    level: '심화반',
                    teacher: '최선생',
                    schedule: '월/수',
                    time: '19:00-21:00',
                    currentStudents: 10,
                    maxStudents: 12,
                    fee: 400000,
                    status: 'active'
                },
                {
                    id: 4,
                    name: '중등수학 중급반',
                    subject: 'math',
                    level: '중급반',
                    teacher: '박선생',
                    schedule: '화/목/금',
                    time: '18:00-20:00',
                    currentStudents: 18,
                    maxStudents: 20,
                    fee: 300000,
                    status: 'active'
                },
                {
                    id: 5,
                    name: '고등국어 심화반',
                    subject: 'korean',
                    level: '심화반',
                    teacher: '정선생',
                    schedule: '수/금',
                    time: '18:00-20:00',
                    currentStudents: 0,
                    maxStudents: 15,
                    fee: 320000,
                    status: 'scheduled'
                }
            ],

            // 모달
            showModal: false,
            modalMode: 'add', // 'add' or 'edit'
            modalData: {
                id: null,
                name: '',
                subject: '',
                teacherId: '',
                level: '',
                schedule: '',
                time: '',
                maxStudents: '',
                fee: ''
            }
        };
    },

    computed: {
        // 필터링된 수업 목록
        filteredClasses() {
            let filtered = this.classes;

            // 검색어 필터
            if (this.searchKeyword) {
                const keyword = this.searchKeyword.toLowerCase();
                filtered = filtered.filter(cls =>
                    cls.name.toLowerCase().includes(keyword) ||
                    cls.teacher.toLowerCase().includes(keyword)
                );
            }

            // 과목 필터
            if (this.filters.subject) {
                filtered = filtered.filter(cls => cls.subject === this.filters.subject);
            }

            // 상태 필터
            if (this.filters.status) {
                filtered = filtered.filter(cls => cls.status === this.filters.status);
            }

            return filtered;
        }
    },

    mounted() {
        // 수업 목록 로드
        this.loadClasses();
    },

    methods: {
        // 수업 목록 로드
        async loadClasses() {
            // 실제로는 API 호출
            // const response = await this.$api.get('/api/classes');
            // this.classes = response.data;

            console.log('수업 목록 로드 완료');
        },

        // 검색 처리
        handleSearch() {
            // 검색어 변경 시 실시간 필터링 (computed에서 처리)
        },

        // 필터 처리
        handleFilter() {
            // 필터 변경 시 실시간 필터링 (computed에서 처리)
        },

        // 수업 개설 모달 표시
        showAddModal() {
            this.modalMode = 'add';
            this.modalData = {
                id: null,
                name: '',
                subject: '',
                teacherId: '',
                level: '',
                schedule: '',
                time: '',
                maxStudents: '',
                fee: ''
            };
            this.showModal = true;
        },

        // 수업 상세보기
        viewDetail(cls) {
            // 수업 상세 페이지로 이동
            window.location.hash = `#/classes/detail?id=${cls.id}`;
        },

        // 수업 수정
        editClass(cls) {
            this.modalMode = 'edit';
            this.modalData = {
                id: cls.id,
                name: cls.name,
                subject: cls.subject,
                teacherId: cls.teacherId || '1',
                level: cls.level,
                schedule: cls.schedule,
                time: cls.time,
                maxStudents: cls.maxStudents,
                fee: cls.fee
            };
            this.showModal = true;
        },

        // 모달 닫기
        closeModal() {
            this.showModal = false;
            this.modalData = {
                id: null,
                name: '',
                subject: '',
                teacherId: '',
                level: '',
                schedule: '',
                time: '',
                maxStudents: '',
                fee: ''
            };
        },

        // 폼 제출
        async handleSubmit() {
            try {
                if (this.modalMode === 'add') {
                    // 등록
                    // const response = await this.$api.post('/api/classes', this.modalData);

                    // 목록에 추가
                    const newClass = {
                        id: Date.now(),
                        ...this.modalData,
                        teacher: this.getTeacherName(this.modalData.teacherId),
                        currentStudents: 0,
                        status: 'scheduled'
                    };
                    this.classes.unshift(newClass);

                    alert('수업이 개설되었습니다.');
                    console.log('수업 개설:', this.modalData);
                } else {
                    // 수정
                    // await this.$api.put(`/api/classes/${this.modalData.id}`, this.modalData);

                    // 목록 업데이트
                    const index = this.classes.findIndex(c => c.id === this.modalData.id);
                    if (index > -1) {
                        this.classes[index] = {
                            ...this.classes[index],
                            ...this.modalData,
                            teacher: this.getTeacherName(this.modalData.teacherId)
                        };
                    }

                    alert('수업 정보가 수정되었습니다.');
                    console.log('수업 수정:', this.modalData);
                }

                this.closeModal();
            } catch (error) {
                alert('오류가 발생했습니다. 다시 시도해주세요.');
                console.error(error);
            }
        },

        // 강사명 가져오기
        getTeacherName(teacherId) {
            const teacherNames = {
                '1': '박선생',
                '2': '이선생',
                '3': '최선생',
                '4': '정선생'
            };
            return teacherNames[teacherId] || '알 수 없음';
        },

        // 과목 텍스트 반환
        getSubjectText(subject) {
            const subjectMap = {
                math: '수학',
                english: '영어',
                science: '과학',
                korean: '국어'
            };
            return subjectMap[subject] || subject;
        },

        // 과목 배지 클래스 반환
        getSubjectBadgeClass(subject) {
            const classMap = {
                math: 'bg-primary',
                english: 'bg-success',
                science: 'bg-info',
                korean: 'bg-warning'
            };
            return classMap[subject] || 'bg-secondary';
        },

        // 상태 텍스트 반환
        getStatusText(status) {
            const statusMap = {
                active: '진행중',
                scheduled: '예정',
                completed: '종료'
            };
            return statusMap[status] || status;
        },

        // 상태 배지 클래스 반환
        getStatusBadgeClass(status) {
            const classMap = {
                active: 'bg-success',
                scheduled: 'bg-primary',
                completed: 'bg-secondary'
            };
            return classMap[status] || 'bg-secondary';
        }
    }
};
