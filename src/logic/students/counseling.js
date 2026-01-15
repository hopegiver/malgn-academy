export default {
    data() {
        return {
            // 검색 및 필터
            searchKeyword: '',
            filters: {
                type: '',
                period: 'all'
            },

            // 통계
            stats: {
                total: 156,
                today: 3,
                thisWeek: 12,
                thisMonth: 45
            },

            // 상담 기록 목록
            counselings: [
                {
                    id: 1,
                    studentId: 1,
                    studentName: '김철수',
                    date: '2024-12-20',
                    title: '진로 상담',
                    type: 'career',
                    counselor: '홍길동 원장',
                    content: '이공계 진학 희망. 수학 성적이 우수하여 공대 진학을 추천함. 학생도 컴퓨터공학에 관심이 많아 관련 학과 정보 제공.'
                },
                {
                    id: 2,
                    studentId: 2,
                    studentName: '이영희',
                    date: '2024-12-19',
                    title: '학습 상담',
                    type: 'study',
                    counselor: '박선생',
                    content: '영어 성적 향상을 위한 학습 방법 논의. 독해 위주의 학습에서 듣기와 말하기 연습을 병행할 것을 권유함.'
                },
                {
                    id: 3,
                    studentId: 3,
                    studentName: '박민수',
                    date: '2024-12-18',
                    title: '학부모 상담',
                    type: 'parent',
                    counselor: '이선생',
                    content: '학부모 면담. 학생의 수업 태도는 양호하나 과제 제출률이 낮음. 가정에서의 학습 관리 필요성 강조.'
                },
                {
                    id: 4,
                    studentId: 4,
                    studentName: '최지훈',
                    date: '2024-12-17',
                    title: '생활 상담',
                    type: 'behavior',
                    counselor: '홍길동 원장',
                    content: '최근 수업 집중도가 떨어짐. 학생과의 면담 결과 친구 관계로 인한 스트레스가 원인. 지속적인 관찰 필요.'
                },
                {
                    id: 5,
                    studentId: 5,
                    studentName: '정수진',
                    date: '2024-12-15',
                    title: '학습 상담',
                    type: 'study',
                    counselor: '박선생',
                    content: '수학 심화반 추가 수강 권유. 현재 진도는 무난하게 따라오고 있으나, 더 높은 수준의 문제 풀이 연습이 필요함.'
                },
                {
                    id: 6,
                    studentId: 1,
                    studentName: '김철수',
                    date: '2024-12-10',
                    title: '학부모 상담',
                    type: 'parent',
                    counselor: '이선생',
                    content: '학부모 면담. 학생의 학습 태도와 성적이 우수함. 학원 수업에 만족도가 높음. 내신 관리와 함께 수능 대비 병행 필요.'
                }
            ],

            // 모달
            showModal: false,
            modalMode: 'add', // 'add' or 'edit'
            modalData: {
                id: null,
                studentId: '',
                date: '',
                type: '',
                title: '',
                content: ''
            }
        };
    },

    computed: {
        // 필터링된 상담 목록
        filteredCounselings() {
            let filtered = this.counselings;

            // 검색어 필터
            if (this.searchKeyword) {
                const keyword = this.searchKeyword.toLowerCase();
                filtered = filtered.filter(counsel =>
                    counsel.studentName.toLowerCase().includes(keyword) ||
                    counsel.counselor.toLowerCase().includes(keyword) ||
                    counsel.title.toLowerCase().includes(keyword)
                );
            }

            // 유형 필터
            if (this.filters.type) {
                filtered = filtered.filter(counsel => counsel.type === this.filters.type);
            }

            // 기간 필터
            if (this.filters.period !== 'all') {
                const today = new Date();
                filtered = filtered.filter(counsel => {
                    const counselDate = new Date(counsel.date);

                    switch (this.filters.period) {
                        case 'today':
                            return counselDate.toDateString() === today.toDateString();
                        case 'week':
                            const weekAgo = new Date(today);
                            weekAgo.setDate(today.getDate() - 7);
                            return counselDate >= weekAgo;
                        case 'month':
                            return counselDate.getMonth() === today.getMonth() &&
                                   counselDate.getFullYear() === today.getFullYear();
                        default:
                            return true;
                    }
                });
            }

            // 날짜순 정렬 (최신순)
            return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        }
    },

    mounted() {
        // 상담 목록 로드
        this.loadCounselings();
    },

    methods: {
        // 상담 목록 로드
        async loadCounselings() {
            // 실제로는 API 호출
            // const response = await this.$api.get('/api/counselings');
            // this.counselings = response.data;

            console.log('상담 목록 로드 완료');
        },

        // 검색 처리
        handleSearch() {
            // 검색어 변경 시 실시간 필터링 (computed에서 처리)
        },

        // 필터 처리
        handleFilter() {
            // 필터 변경 시 실시간 필터링 (computed에서 처리)
        },

        // 필터 초기화
        resetFilter() {
            this.searchKeyword = '';
            this.filters.type = '';
            this.filters.period = 'all';
        },

        // 상담 등록 모달 표시
        showAddModal() {
            this.modalMode = 'add';
            this.modalData = {
                id: null,
                studentId: '',
                date: new Date().toISOString().split('T')[0],
                type: '',
                title: '',
                content: ''
            };
            this.showModal = true;
        },

        // 상담 수정
        editCounseling(counsel) {
            this.modalMode = 'edit';
            this.modalData = {
                id: counsel.id,
                studentId: counsel.studentId,
                date: counsel.date,
                type: counsel.type,
                title: counsel.title,
                content: counsel.content
            };
            this.showModal = true;
        },

        // 상담 삭제
        async deleteCounseling(counsel) {
            if (!confirm(`"${counsel.title}" 상담 기록을 삭제하시겠습니까?`)) {
                return;
            }

            try {
                // 실제로는 API 호출
                // await this.$api.delete(`/api/counselings/${counsel.id}`);

                // 목록에서 제거
                const index = this.counselings.findIndex(c => c.id === counsel.id);
                if (index > -1) {
                    this.counselings.splice(index, 1);
                }

                alert('상담 기록이 삭제되었습니다.');
                console.log('상담 삭제:', counsel.id);
            } catch (error) {
                alert('오류가 발생했습니다. 다시 시도해주세요.');
                console.error(error);
            }
        },

        // 상세보기
        viewDetail(counsel) {
            // 학생 상세 페이지의 상담 탭으로 이동
            window.location.hash = `#/students/detail?id=${counsel.studentId}`;
        },

        // 모달 닫기
        closeModal() {
            this.showModal = false;
            this.modalData = {
                id: null,
                studentId: '',
                date: '',
                type: '',
                title: '',
                content: ''
            };
        },

        // 폼 제출
        async handleSubmit() {
            try {
                if (this.modalMode === 'add') {
                    // 등록
                    // const response = await this.$api.post('/api/counselings', this.modalData);

                    // 목록에 추가
                    const newCounseling = {
                        id: Date.now(),
                        ...this.modalData,
                        studentName: this.getStudentName(this.modalData.studentId),
                        counselor: '홍길동 원장'
                    };
                    this.counselings.unshift(newCounseling);

                    alert('상담 기록이 등록되었습니다.');
                    console.log('상담 등록:', this.modalData);
                } else {
                    // 수정
                    // await this.$api.put(`/api/counselings/${this.modalData.id}`, this.modalData);

                    // 목록 업데이트
                    const index = this.counselings.findIndex(c => c.id === this.modalData.id);
                    if (index > -1) {
                        this.counselings[index] = {
                            ...this.counselings[index],
                            ...this.modalData,
                            studentName: this.getStudentName(this.modalData.studentId)
                        };
                    }

                    alert('상담 기록이 수정되었습니다.');
                    console.log('상담 수정:', this.modalData);
                }

                this.closeModal();
            } catch (error) {
                alert('오류가 발생했습니다. 다시 시도해주세요.');
                console.error(error);
            }
        },

        // 학생명 가져오기
        getStudentName(studentId) {
            const studentNames = {
                '1': '김철수',
                '2': '이영희',
                '3': '박민수',
                '4': '최지훈',
                '5': '정수진'
            };
            return studentNames[studentId] || '알 수 없음';
        },

        // 상담 유형 텍스트 반환
        getCounselingTypeText(type) {
            const typeMap = {
                career: '진로',
                study: '학습',
                parent: '학부모',
                behavior: '생활'
            };
            return typeMap[type] || type;
        },

        // 상담 유형 배지 클래스 반환
        getCounselingTypeBadge(type) {
            const classMap = {
                career: 'bg-primary',
                study: 'bg-success',
                parent: 'bg-info',
                behavior: 'bg-warning'
            };
            return classMap[type] || 'bg-secondary';
        }
    }
};
