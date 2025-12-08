// Animate numbers khi trang load
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value.toLocaleString('vi-VN');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Animate skill bars
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        setTimeout(() => {
            bar.style.width = progress + '%';
        }, 100);
    });
}

// Animate stats when page loads
window.addEventListener('load', () => {
    const statValues = document.querySelectorAll('.stat-value');
    statValues.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        animateValue(stat, 0, target, 2000);
    });
    
    // Animate skills
    animateSkills();
});

// Edit avatar button
const editAvatarBtn = document.getElementById('editAvatar');
const avatar = document.getElementById('avatar');

editAvatarBtn.addEventListener('click', () => {
    const names = [
        'Nguyen Van A',
        'Tran Thi B',
        'Le Van C',
        'Pham Thi D',
        'Hoang Van E'
    ];
    const colors = [
        '4F46E5', // Indigo
        'EC4899', // Pink
        '10B981', // Green
        'F59E0B', // Amber
        '8B5CF6', // Purple
        'EF4444', // Red
        '3B82F6'  // Blue
    ];
    
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    avatar.style.opacity = '0';
    avatar.style.transform = 'scale(0.8)';
    
   
});

// Add transition for avatar
avatar.style.transition = 'all 0.3s ease';

// Button interactions
const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        // Show alert
        if (this.classList.contains('btn-primary')) {
            showNotification('Đã theo dõi!');
        } else {
            showNotification('Đang mở tin nhắn...');
        }
    });
});

// Add ripple styles dynamically
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        animation: slideIn 0.3s ease;
        z-index: 1000;
        font-weight: 500;
        color: #2d3748;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Notification function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

// Social links
const socialLinks = document.querySelectorAll('.social-link');
socialLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const platform = link.getAttribute('title');
        showNotification(`Đang mở ${platform}...`);
    });
});

// Add hover effect to profile name
const profileName = document.getElementById('profileName');
let isEditing = false;

profileName.addEventListener('dblclick', () => {
    if (!isEditing) {
        isEditing = true;
        const currentName = profileName.textContent;
        profileName.contentEditable = true;
        profileName.style.outline = '2px solid #667eea';
        profileName.style.padding = '5px';
        profileName.style.borderRadius = '5px';
        profileName.focus();
        
        // Select all text
        const range = document.createRange();
        range.selectNodeContents(profileName);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        
        const finishEditing = () => {
            profileName.contentEditable = false;
            profileName.style.outline = 'none';
            profileName.style.padding = '0';
            isEditing = false;
            showNotification('Tên đã được cập nhật!');
        };
        
        profileName.addEventListener('blur', finishEditing, { once: true });
        profileName.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                profileName.blur();
            }
        }, { once: true });
    }
});


