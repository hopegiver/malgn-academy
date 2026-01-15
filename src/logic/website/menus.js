export default {
    data() {
        return {
            showCreateModal: false,
            currentMenu: {
                id: null,
                name: '',
                url: '',
                parentId: '',
                order: 1,
                isActive: true
            },
            menus: [
                {
                    id: 1,
                    name: '학원소개',
                    url: '/about',
                    order: 1,
                    isActive: true,
                    children: [
                        { id: 11, name: '인사말', url: '/about/greeting', order: 1, isActive: true },
                        { id: 12, name: '오시는 길', url: '/about/location', order: 2, isActive: true },
                        { id: 13, name: '시설안내', url: '/about/facilities', order: 3, isActive: true }
                    ]
                },
                {
                    id: 2,
                    name: '강의안내',
                    url: '/courses',
                    order: 2,
                    isActive: true,
                    children: [
                        { id: 21, name: '초등부', url: '/courses/elementary', order: 1, isActive: true },
                        { id: 22, name: '중등부', url: '/courses/middle', order: 2, isActive: true },
                        { id: 23, name: '고등부', url: '/courses/high', order: 3, isActive: true }
                    ]
                },
                {
                    id: 3,
                    name: '커뮤니티',
                    url: '/community',
                    order: 3,
                    isActive: true,
                    children: [
                        { id: 31, name: '공지사항', url: '/community/notice', order: 1, isActive: true },
                        { id: 32, name: '자료실', url: '/community/resources', order: 2, isActive: true },
                        { id: 33, name: '갤러리', url: '/community/gallery', order: 3, isActive: true }
                    ]
                },
                {
                    id: 4,
                    name: '상담문의',
                    url: '/inquiry',
                    order: 4,
                    isActive: true,
                    children: []
                }
            ]
        };
    },

    computed: {
        stats() {
            let totalMenus = this.menus.length;
            let activeMenus = this.menus.filter(m => m.isActive).length;

            // 2뎁스 메뉴도 카운트
            this.menus.forEach(menu => {
                if (menu.children && menu.children.length > 0) {
                    totalMenus += menu.children.length;
                    activeMenus += menu.children.filter(c => c.isActive).length;
                }
            });

            return {
                totalMenus: totalMenus,
                parentMenus: this.menus.length,
                activeMenus: activeMenus
            };
        }
    },

    methods: {
        editMenu(menu, parentId) {
            this.currentMenu = {
                id: menu.id,
                name: menu.name,
                url: menu.url,
                parentId: parentId || '',
                order: menu.order,
                isActive: menu.isActive
            };
            this.showCreateModal = true;
        },

        moveUp(menuId) {
            const index = this.menus.findIndex(m => m.id === menuId);
            if (index > 0) {
                const temp = this.menus[index];
                this.menus[index] = this.menus[index - 1];
                this.menus[index - 1] = temp;

                // 순서 재정렬
                this.menus.forEach((menu, idx) => {
                    menu.order = idx + 1;
                });
            }
        },

        deleteMenu(menuId, parentId) {
            if (parentId) {
                // 2뎁스 메뉴 삭제
                const parentMenu = this.menus.find(m => m.id === parentId);
                if (parentMenu) {
                    const childIndex = parentMenu.children.findIndex(c => c.id === menuId);
                    if (childIndex !== -1) {
                        if (confirm('이 메뉴를 삭제하시겠습니까?')) {
                            parentMenu.children.splice(childIndex, 1);
                            alert('메뉴가 삭제되었습니다.');
                        }
                    }
                }
            } else {
                // 1뎁스 메뉴 삭제
                const index = this.menus.findIndex(m => m.id === menuId);
                if (index !== -1) {
                    const menu = this.menus[index];
                    if (menu.children && menu.children.length > 0) {
                        alert('하위 메뉴가 있는 메뉴는 삭제할 수 없습니다.\n하위 메뉴를 먼저 삭제해주세요.');
                        return;
                    }
                    if (confirm('이 메뉴를 삭제하시겠습니까?')) {
                        this.menus.splice(index, 1);
                        alert('메뉴가 삭제되었습니다.');
                    }
                }
            }
        },

        saveMenu() {
            // 유효성 검사
            if (!this.currentMenu.name.trim()) {
                alert('메뉴명을 입력해주세요.');
                return;
            }
            if (!this.currentMenu.url.trim()) {
                alert('링크를 입력해주세요.');
                return;
            }

            if (this.currentMenu.id) {
                // 수정
                if (this.currentMenu.parentId) {
                    // 2뎁스 메뉴 수정
                    const parentMenu = this.menus.find(m => m.id === this.currentMenu.parentId);
                    if (parentMenu) {
                        const childIndex = parentMenu.children.findIndex(c => c.id === this.currentMenu.id);
                        if (childIndex !== -1) {
                            parentMenu.children[childIndex] = {
                                id: this.currentMenu.id,
                                name: this.currentMenu.name,
                                url: this.currentMenu.url,
                                order: this.currentMenu.order,
                                isActive: this.currentMenu.isActive
                            };
                        }
                    }
                } else {
                    // 1뎁스 메뉴 수정
                    const index = this.menus.findIndex(m => m.id === this.currentMenu.id);
                    if (index !== -1) {
                        this.menus[index] = {
                            ...this.menus[index],
                            name: this.currentMenu.name,
                            url: this.currentMenu.url,
                            order: this.currentMenu.order,
                            isActive: this.currentMenu.isActive
                        };
                    }
                }
                alert('메뉴가 수정되었습니다.');
            } else {
                // 등록
                if (this.currentMenu.parentId) {
                    // 2뎁스 메뉴 등록
                    const parentMenu = this.menus.find(m => m.id === this.currentMenu.parentId);
                    if (parentMenu) {
                        const newChild = {
                            id: Date.now(),
                            name: this.currentMenu.name,
                            url: this.currentMenu.url,
                            order: parentMenu.children.length + 1,
                            isActive: this.currentMenu.isActive
                        };
                        parentMenu.children.push(newChild);
                    }
                } else {
                    // 1뎁스 메뉴 등록
                    const newMenu = {
                        id: Date.now(),
                        name: this.currentMenu.name,
                        url: this.currentMenu.url,
                        order: this.menus.length + 1,
                        isActive: this.currentMenu.isActive,
                        children: []
                    };
                    this.menus.push(newMenu);
                }
                alert('메뉴가 등록되었습니다.');
            }

            this.showCreateModal = false;
            this.resetForm();
        },

        resetForm() {
            this.currentMenu = {
                id: null,
                name: '',
                url: '',
                parentId: '',
                order: 1,
                isActive: true
            };
        }
    },

    mounted() {
        console.log('메뉴 관리 페이지 로드됨');
    }
};
