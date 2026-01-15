export default {
    data() {
        return {
            // 검색 및 필터
            searchKeyword: '',
            filters: {
                classId: '',
                status: ''
            },

            // 통계
            stats: {
                total: 245,
                active: 218,
                pending: 12,
                newThisMonth: 24
            },

            // 수강 신청 목록
            enrollments: [
                {
                    id: 1,
                    studentId: 1,
                    studentName: '김철수',
                    grade: '고1',
                    classId: 1,
                    className: '고등수학 심화반',
                    teacher: '박선생',
                    appliedDate: '2024-12-15',
                    startDate: '2025-01-01',
                    fee: 350000,
                    discount: 0,
                    status: 'active'
                },
                {
                    id: 2,
                    studentId: 2,
                    studentName: '이영희',
                    grade: '중2',
                    classId: 2,
                    className: '중등영어 기초반',
                    teacher: '이선생',
                    appliedDate: '2024-12-18',
                    startDate: '2025-01-05',
                    fee: 280000,
                    discount: 10,
                    status: 'pending'
                },
                {
                    id: 3,
                    studentId: 3,
                    studentName: '박민수',
                    grade: '고3',
                    classId: 3,
                    className: '고등물리 심화반',
                    teacher: '최선생',
                    appliedDate: '2024-12-10',
                    startDate: '2024-12-20',
                    fee: 400000,
                    discount: 0,
                    status: 'active'
                },
                {
                    id: 4,
                    studentId: 4,
                    studentName: '최지훈',
                    grade: '중1',
                    classId: 4,
                    className: '중등수학 중급반',
                    teacher: '박선생',
                    appliedDate: '2024-12-12',
                    startDate: '2024-12-15',
                    fee: 300000,
                    discount: 5,
                    status: 'active'
                },
                {
                    id: 5,
                    studentId: 5,
                    studentName: '정수진',
                    grade: '고2',
                    classId: 1,
                    className: '고등수학 심화반',
                    teacher: '박선생',
                    appliedDate: '2024-12-20',
                    startDate: '2025-01-01',
                    fee: 350000,
                    discount: 0,
                    status: 'pending'
                }
            ],

            // 모달
            showModal: false,
            modalMode: 'add', // 'add' or 'edit'
            modalData: {
                id: null,
                studentId: '',
                classId: '',
                appliedDate: '',
                startDate: '',
                fee: '',
                discount: 0,
                memo: ''
            }
        };
    },

    computed: {
        // 필터링된 수강 신청 목록
        filteredEnrollments() {
            let filtered = this.enrollments;

            // 검색어 필터
            if (this.searchKeyword) {
                const keyword = this.searchKeyword.toLowerCase();
                filtered = filtered.filter(enroll =>
                    enroll.studentName.toLowerCase().includes(keyword)
                );
            }

            // 수업 필터
            if (this.filters.classId) {
                filtered = filtered.filter(enroll => enroll.classId == this.filters.classId);
            }

            // 상태 필터
            if (this.filters.status) {
                filtered = filtered.filter(enroll => enroll.status === this.filters.status);
            }

            // 날짜순 정렬 (최신순)
            return filtered.sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate));
        }
    },

    mounted() {
        // 수강 신청 목록 로드
        this.loadEnrollments();
    },

    methods: {
        // 수강 신청 목록 로드
        async loadEnrollments() {
            // 실제로는 API 호출
            // const response = await this.$api.get('/api/enrollments');
            // this.enrollments = response.data;

            console.log('수강 신청 목록 로드 완료');
        },

        // 검색 처리
        handleSearch() {
            // 검색어 변경 시 실시간 필터링 (computed에서 처리)
        },

        // 필터 처리
        handleFilter() {
            // 필터 변경 시 실시간 필터링 (computed에서 처리)
        },

        // 수강 신청 모달 표시
        showEnrollModal() {
            this.modalMode = 'add';
            this.modalData = {
                id: null,
                studentId: '',
                classId: '',
                appliedDate: new Date().toISOString().split('T')[0],
                startDate: '',
                fee: '',
                discount: 0,
                memo: ''
            };
            this.showModal = true;
        },

        // 수강 신청 수정
        editEnrollment(enroll) {
            this.modalMode = 'edit';
            this.modalData = {
                id: enroll.id,
                studentId: enroll.studentId,
                classId: enroll.classId,
                appliedDate: enroll.appliedDate,
                startDate: enroll.startDate,
                fee: enroll.fee,
                discount: enroll.discount || 0,
                memo: enroll.memo || ''
            };
            this.showModal = true;
        },

        // 수강 신청 승인
        async approveEnrollment(enroll) {
            if (!confirm(`${enroll.studentName} 학생의 수강 신청을 승인하시겠습니까?`)) {
                return;
            }

            try {
                // 실제로는 API 호출
                // await this.$api.put(`/api/enrollments/${enroll.id}/approve`);

                // 상태 업데이트
                const index = this.enrollments.findIndex(e => e.id === enroll.id);
                if (index > -1) {
                    this.enrollments[index].status = 'active';
                }

                alert('수강 신청이 승인되었습니다.');
                console.log('수강 신청 승인:', enroll.id);
            } catch (error) {
                alert('오류가 발생했습니다. 다시 시도해주세요.');
                console.error(error);
            }
        },

        // 수강 신청 취소
        async cancelEnrollment(enroll) {
            if (!confirm(`${enroll.studentName} 학생의 수강 신청을 취소하시겠습니까?`)) {
                return;
            }

            try {
                // 실제로는 API 호출
                // await this.$api.put(`/api/enrollments/${enroll.id}/cancel`);

                // 목록에서 제거
                const index = this.enrollments.findIndex(e => e.id === enroll.id);
                if (index > -1) {
                    this.enrollments.splice(index, 1);
                }

                alert('수강 신청이 취소되었습니다.');
                console.log('수강 신청 취소:', enroll.id);
            } catch (error) {
                alert('오류가 발생했습니다. 다시 시도해주세요.');
                console.error(error);
            }
        },

        // 수업 선택 시 수강료 자동 입력
        handleClassChange() {
            const classInfo = {
                '1': { fee: 350000 },
                '2': { fee: 280000 },
                '3': { fee: 400000 },
                '4': { fee: 300000 }
            };

            if (this.modalData.classId && classInfo[this.modalData.classId]) {
                this.modalData.fee = classInfo[this.modalData.classId].fee;
            }
        },

        // 할인 적용 후 금액 계산
        calculateDiscountedFee() {
            if (!this.modalData.fee || !this.modalData.discount) {
                return this.modalData.fee || 0;
            }
            return this.modalData.fee * (1 - this.modalData.discount / 100);
        },

        // 모달 닫기
        closeModal() {
            this.showModal = false;
            this.modalData = {
                id: null,
                studentId: '',
                classId: '',
                appliedDate: '',
                startDate: '',
                fee: '',
                discount: 0,
                memo: ''
            };
        },

        // 폼 제출
        async handleSubmit() {
            try {
                if (this.modalMode === 'add') {
                    // 등록
                    // const response = await this.$api.post('/api/enrollments', this.modalData);

                    // 목록에 추가
                    const newEnrollment = {
                        id: Date.now(),
                        ...this.modalData,
                        studentName: this.getStudentName(this.modalData.studentId),
                        grade: this.getStudentGrade(this.modalData.studentId),
                        className: this.getClassName(this.modalData.classId),
                        teacher: this.getTeacherName(this.modalData.classId),
                        status: 'pending'
                    };
                    this.enrollments.unshift(newEnrollment);

                    alert('수강 신청이 등록되었습니다.');
                    console.log('수강 신청 등록:', this.modalData);
                } else {
                    // 수정
                    // await this.$api.put(`/api/enrollments/${this.modalData.id}`, this.modalData);

                    // 목록 업데이트
                    const index = this.enrollments.findIndex(e => e.id === this.modalData.id);
                    if (index > -1) {
                        this.enrollments[index] = {
                            ...this.enrollments[index],
                            ...this.modalData,
                            studentName: this.getStudentName(this.modalData.studentId),
                            grade: this.getStudentGrade(this.modalData.studentId),
                            className: this.getClassName(this.modalData.classId),
                            teacher: this.getTeacherName(this.modalData.classId)
                        };
                    }

                    alert('수강 신청 정보가 수정되었습니다.');
                    console.log('수강 신청 수정:', this.modalData);
                }

                this.closeModal();
            } catch (error) {
                alert('오류가 발생했습니다. 다시 시도해주세요.');
                console.error(error);
            }
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

        // 강사명 가져오기
        getTeacherName(classId) {
            const teachers = {
                '1': '박선생',
                '2': '이선생',
                '3': '최선생',
                '4': '박선생'
            };
            return teachers[classId] || '알 수 없음';
        },

        // 금액 포맷팅
        formatCurrency(amount) {
            return new Intl.NumberFormat('ko-KR').format(amount);
        },

        // 상태 텍스트 반환
        getStatusText(status) {
            const statusMap = {
                active: '수강중',
                pending: '대기중',
                completed: '수강완료',
                cancelled: '취소'
            };
            return statusMap[status] || status;
        },

        // 상태 배지 클래스 반환
        getStatusBadgeClass(status) {
            const classMap = {
                active: 'bg-success',
                pending: 'bg-warning',
                completed: 'bg-secondary',
                cancelled: 'bg-danger'
            };
            return classMap[status] || 'bg-secondary';
        }
    }
};
