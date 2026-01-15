export default {
    data() {
        return {
            searchKeyword: '',
            filterStatus: '',
            filterType: '',
            showCreateModal: false,
            currentPage: {
                id: null,
                title: '',
                url: '',
                type: '소개',
                status: '임시저장',
                metaKeyword: '',
                content: ''
            },
            stats: {
                totalPages: 12,
                publishedPages: 8,
                draftPages: 4,
                monthlyVisits: 2450
            },
            pages: [
                {
                    id: 1,
                    title: '학원 소개',
                    url: '/about',
                    type: '소개',
                    createdDate: '2024-01-05',
                    updatedDate: '2024-01-10',
                    views: 1250,
                    status: '공개',
                    content: '<h1>학원 소개</h1><p>저희 학원은...</p>'
                },
                {
                    id: 2,
                    title: '강의 안내',
                    url: '/courses',
                    type: '안내',
                    createdDate: '2024-01-06',
                    updatedDate: '2024-01-12',
                    views: 980,
                    status: '공개',
                    content: '<h1>강의 안내</h1>'
                },
                {
                    id: 3,
                    title: '입학 안내',
                    url: '/admission',
                    type: '안내',
                    createdDate: '2024-01-07',
                    updatedDate: '2024-01-13',
                    views: 850,
                    status: '공개',
                    content: '<h1>입학 안내</h1>'
                },
                {
                    id: 4,
                    title: '오시는 길',
                    url: '/location',
                    type: '안내',
                    createdDate: '2024-01-08',
                    updatedDate: '2024-01-14',
                    views: 720,
                    status: '공개',
                    content: '<h1>오시는 길</h1>'
                },
                {
                    id: 5,
                    title: '수강료 안내',
                    url: '/tuition',
                    type: '안내',
                    createdDate: '2024-01-09',
                    updatedDate: '2024-01-15',
                    views: 650,
                    status: '임시저장',
                    content: '<h1>수강료 안내</h1>'
                },
                {
                    id: 6,
                    title: '시설 안내',
                    url: '/facilities',
                    type: '안내',
                    createdDate: '2024-01-10',
                    updatedDate: '2024-01-15',
                    views: 520,
                    status: '비공개',
                    content: '<h1>시설 안내</h1>'
                }
            ]
        };
    },
    computed: {
        filteredPages() {
            return this.pages.filter(page => {
                const matchKeyword = page.title.includes(this.searchKeyword) ||
                                    page.url.includes(this.searchKeyword);
                const matchStatus = !this.filterStatus || page.status === this.filterStatus;
                const matchType = !this.filterType || page.type === this.filterType;
                return matchKeyword && matchStatus && matchType;
            });
        }
    },
    methods: {
        editPage(page) {
            this.currentPage = { ...page };
            this.showCreateModal = true;
        },
        deletePage(id) {
            if (confirm('정말 삭제하시겠습니까?')) {
                this.pages = this.pages.filter(p => p.id !== id);
                alert('삭제되었습니다.');
            }
        },
        savePage(status) {
            if (!this.currentPage.title || !this.currentPage.url) {
                alert('필수 항목을 입력해주세요.');
                return;
            }

            this.currentPage.status = status;

            if (this.currentPage.id) {
                // 수정
                const index = this.pages.findIndex(p => p.id === this.currentPage.id);
                if (index !== -1) {
                    this.currentPage.updatedDate = new Date().toISOString().split('T')[0];
                    this.pages[index] = { ...this.currentPage };
                }
                alert('수정되었습니다.');
            } else {
                // 생성
                this.currentPage.id = Date.now();
                this.currentPage.createdDate = new Date().toISOString().split('T')[0];
                this.currentPage.updatedDate = new Date().toISOString().split('T')[0];
                this.currentPage.views = 0;
                this.pages.unshift({ ...this.currentPage });
                alert('생성되었습니다.');
            }

            this.showCreateModal = false;
            this.resetForm();
        },
        resetForm() {
            this.currentPage = {
                id: null,
                title: '',
                url: '',
                type: '소개',
                status: '임시저장',
                metaKeyword: '',
                content: ''
            };
        }
    }
};
