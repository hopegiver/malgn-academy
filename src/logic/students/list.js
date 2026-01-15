export default {
    data() {
        return {
            // 검색 및 필터
            searchKeyword: '',
            filters: {
                grade: '',
                status: ''
            },

            // 통계
            stats: {
                total: 180,
                active: 172,
                newThisMonth: 18,
                inactive: 8
            },

            // 학생 목록
            students: [
                {
                    id: 1,
                    name: '김철수',
                    initial: '김',
                    grade: 'high',
                    gradeText: '고등 2학년',
                    school: '서울고등학교',
                    phone: '010-1234-5678',
                    parentName: '김영희',
                    parentPhone: '010-9876-5432',
                    subjects: ['수학', '영어'],
                    status: 'active',
                    registeredAt: '2024-03-15'
                },
                {
                    id: 2,
                    name: '이영희',
                    initial: '이',
                    grade: 'middle',
                    gradeText: '중등 3학년',
                    school: '강남중학교',
                    phone: '010-2345-6789',
                    parentName: '이순신',
                    parentPhone: '010-8765-4321',
                    subjects: ['영어', '과학'],
                    status: 'active',
                    registeredAt: '2024-02-20'
                },
                {
                    id: 3,
                    name: '박민수',
                    initial: '박',
                    grade: 'high',
                    gradeText: '고등 1학년',
                    school: '서울고등학교',
                    phone: '010-3456-7890',
                    parentName: '박지성',
                    parentPhone: '010-7654-3210',
                    subjects: ['수학'],
                    status: 'active',
                    registeredAt: '2024-01-10'
                },
                {
                    id: 4,
                    name: '최지훈',
                    initial: '최',
                    grade: 'high',
                    gradeText: '고등 3학년',
                    school: '강남고등학교',
                    phone: '010-4567-8901',
                    parentName: '최민호',
                    parentPhone: '010-6543-2109',
                    subjects: ['수학', '영어', '과학'],
                    status: 'active',
                    registeredAt: '2023-12-05'
                },
                {
                    id: 5,
                    name: '정수진',
                    initial: '정',
                    grade: 'middle',
                    gradeText: '중등 2학년',
                    school: '강남중학교',
                    phone: '010-5678-9012',
                    parentName: '정미경',
                    parentPhone: '010-5432-1098',
                    subjects: ['수학', '영어'],
                    status: 'active',
                    registeredAt: '2024-03-01'
                },
                {
                    id: 6,
                    name: '강동원',
                    initial: '강',
                    grade: 'elementary',
                    gradeText: '초등 6학년',
                    school: '서울초등학교',
                    phone: '010-6789-0123',
                    parentName: '강호동',
                    parentPhone: '010-4321-0987',
                    subjects: ['수학'],
                    status: 'hold',
                    registeredAt: '2023-09-15'
                },
                {
                    id: 7,
                    name: '송혜교',
                    initial: '송',
                    grade: 'high',
                    gradeText: '고등 2학년',
                    school: '강남고등학교',
                    phone: '010-7890-1234',
                    parentName: '송강호',
                    parentPhone: '010-3210-9876',
                    subjects: ['영어', '국어'],
                    status: 'inactive',
                    registeredAt: '2023-06-20'
                },
                {
                    id: 8,
                    name: '전지현',
                    initial: '전',
                    grade: 'middle',
                    gradeText: '중등 3학년',
                    school: '서울중학교',
                    phone: '010-8901-2345',
                    parentName: '전태수',
                    parentPhone: '010-2109-8765',
                    subjects: ['수학', '과학'],
                    status: 'active',
                    registeredAt: '2024-04-01'
                }
            ],

            // 페이지네이션
            currentPage: 1,
            itemsPerPage: 10
        };
    },

    computed: {
        // 필터링된 학생 목록
        filteredStudents() {
            let filtered = this.students;

            // 검색어 필터
            if (this.searchKeyword) {
                const keyword = this.searchKeyword.toLowerCase();
                filtered = filtered.filter(student =>
                    student.name.toLowerCase().includes(keyword) ||
                    student.phone.includes(keyword) ||
                    student.parentName.toLowerCase().includes(keyword) ||
                    student.parentPhone.includes(keyword)
                );
            }

            // 학년 필터
            if (this.filters.grade) {
                filtered = filtered.filter(student => student.grade === this.filters.grade);
            }

            // 상태 필터
            if (this.filters.status) {
                filtered = filtered.filter(student => student.status === this.filters.status);
            }

            // 페이지네이션
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return filtered.slice(start, end);
        },

        // 전체 페이지 수
        totalPages() {
            let filtered = this.students;

            if (this.searchKeyword) {
                const keyword = this.searchKeyword.toLowerCase();
                filtered = filtered.filter(student =>
                    student.name.toLowerCase().includes(keyword) ||
                    student.phone.includes(keyword)
                );
            }

            if (this.filters.grade) {
                filtered = filtered.filter(student => student.grade === this.filters.grade);
            }

            if (this.filters.status) {
                filtered = filtered.filter(student => student.status === this.filters.status);
            }

            return Math.ceil(filtered.length / this.itemsPerPage);
        },

        // 표시할 페이지 번호들
        displayPages() {
            const pages = [];
            const maxDisplay = 5;
            let start = Math.max(1, this.currentPage - Math.floor(maxDisplay / 2));
            let end = Math.min(this.totalPages, start + maxDisplay - 1);

            if (end - start < maxDisplay - 1) {
                start = Math.max(1, end - maxDisplay + 1);
            }

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            return pages;
        }
    },

    mounted() {
        // 학생 목록 로드
        this.loadStudents();
    },

    methods: {
        // 학생 목록 로드
        async loadStudents() {
            // 실제로는 API 호출
            // const response = await this.$api.get('/api/students');
            // this.students = response.data;

            console.log('학생 목록 로드 완료');
        },

        // 검색 처리
        handleSearch() {
            this.currentPage = 1;
        },

        // 필터 처리
        handleFilter() {
            this.currentPage = 1;
        },

        // 페이지 변경
        changePage(page) {
            if (page < 1 || page > this.totalPages) return;
            this.currentPage = page;
        },

        // 상태 텍스트 반환
        getStatusText(status) {
            const statusMap = {
                active: '재원중',
                inactive: '퇴원',
                hold: '휴원'
            };
            return statusMap[status] || status;
        },

        // 상태 배지 클래스 반환
        getStatusBadgeClass(status) {
            const classMap = {
                active: 'bg-success',
                inactive: 'bg-secondary',
                hold: 'bg-warning'
            };
            return classMap[status] || 'bg-secondary';
        },

        // 학생 수정
        editStudent(student) {
            window.location.hash = '#/students/register?id=' + student.id;
        }
    }
};
