export default {
    data() {
        return {
            searchKeyword: '',
            filterBoard: '',
            filterStatus: '',
            showCreateModal: false,
            currentPost: {
                id: null,
                board: '',
                title: '',
                content: '',
                status: '게시',
                author: '관리자'
            },
            stats: {
                totalPosts: 156,
                weekPosts: 12,
                totalViews: 8543,
                totalComments: 89
            },
            posts: [
                {
                    id: 1,
                    board: '공지사항',
                    title: '2024년 1월 학사일정 안내',
                    author: '관리자',
                    createdDate: '2024-01-15',
                    views: 523,
                    comments: 5,
                    status: '게시',
                    content: '2024년 1월 학사일정을 안내드립니다.'
                },
                {
                    id: 2,
                    title: '겨울방학 특강 안내',
                    board: '학원소식',
                    author: '관리자',
                    createdDate: '2024-01-14',
                    views: 412,
                    comments: 8,
                    status: '게시',
                    content: '겨울방학 특강을 안내드립니다.'
                },
                {
                    id: 3,
                    board: '자료실',
                    title: '수학 학습자료 (중등)',
                    author: '김철수',
                    createdDate: '2024-01-13',
                    views: 305,
                    comments: 2,
                    status: '게시',
                    content: '중등 수학 학습자료입니다.'
                },
                {
                    id: 4,
                    board: '갤러리',
                    title: '2023 졸업식 사진',
                    author: '이영희',
                    createdDate: '2024-01-12',
                    views: 678,
                    comments: 15,
                    status: '게시',
                    content: '2023 졸업식 사진 모음입니다.'
                },
                {
                    id: 5,
                    board: '공지사항',
                    title: '개인정보처리방침 변경 안내',
                    author: '관리자',
                    createdDate: '2024-01-11',
                    views: 234,
                    comments: 1,
                    status: '숨김',
                    content: '개인정보처리방침이 변경되었습니다.'
                },
                {
                    id: 6,
                    board: '학원소식',
                    title: '신규 강사 소개',
                    author: '관리자',
                    createdDate: '2024-01-10',
                    views: 456,
                    comments: 7,
                    status: '게시',
                    content: '신규 강사를 소개합니다.'
                }
            ]
        };
    },
    computed: {
        filteredPosts() {
            return this.posts.filter(post => {
                const matchKeyword = post.title.includes(this.searchKeyword) ||
                                    post.content.includes(this.searchKeyword);
                const matchBoard = !this.filterBoard || post.board === this.filterBoard;
                const matchStatus = !this.filterStatus || post.status === this.filterStatus;
                return matchKeyword && matchBoard && matchStatus;
            });
        }
    },
    methods: {
        editPost(post) {
            this.currentPost = { ...post };
            this.showCreateModal = true;
        },
        deletePost(id) {
            if (confirm('정말 삭제하시겠습니까?')) {
                this.posts = this.posts.filter(p => p.id !== id);
                alert('삭제되었습니다.');
            }
        },
        savePost() {
            if (!this.currentPost.board || !this.currentPost.title) {
                alert('필수 항목을 입력해주세요.');
                return;
            }

            if (this.currentPost.id) {
                // 수정
                const index = this.posts.findIndex(p => p.id === this.currentPost.id);
                if (index !== -1) {
                    this.posts[index] = { ...this.currentPost };
                }
                alert('수정되었습니다.');
            } else {
                // 등록
                this.currentPost.id = Date.now();
                this.currentPost.createdDate = new Date().toISOString().split('T')[0];
                this.currentPost.views = 0;
                this.currentPost.comments = 0;
                this.posts.unshift({ ...this.currentPost });
                alert('등록되었습니다.');
            }

            this.showCreateModal = false;
            this.resetForm();
        },
        resetForm() {
            this.currentPost = {
                id: null,
                board: '',
                title: '',
                content: '',
                status: '게시',
                author: '관리자'
            };
        }
    }
};
