import React, { useState, useRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { selectUserProfile, selectUserLoading, clearProfile } from '../store/userProfileSlice';
import './UserProfile.css';

interface UserProfileProps {
  onLogout?: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  
  const userProfile = useAppSelector(selectUserProfile);
  const isUserLoading = useAppSelector(selectUserLoading);

  // Закрытие дропдауна при клике вне его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(clearProfile());
    setIsDropdownOpen(false);
    if (onLogout) {
      onLogout();
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length >= 2) {
      return `${names[0].charAt(0)}${names[1].charAt(0)}`.toUpperCase();
    }
    return name.charAt(0).toUpperCase();
  };

  const getDisplayName = (name: string) => {
    return name || 'User';
  };

  if (!userProfile) {
    // Show loading state when we're fetching profile
    if (isUserLoading) {
      return (
        <div className="user-profile">
          <button className="user-profile__avatar" disabled>
            <span className="user-profile__avatar-initials">⌛</span>
          </button>
        </div>
      );
    }
    return null;
  }

  return (
    <div className="user-profile" ref={dropdownRef}>
      <button 
        className="user-profile__avatar" 
        onClick={toggleDropdown}
        aria-label="User menu"
      >
        <span className="user-profile__avatar-initials">
          {getInitials(userProfile.name)}
        </span>
      </button>

      {isDropdownOpen && (
        <div className="user-profile__dropdown">
          <div className="user-profile__info">
            <div className="user-profile__name">
              {getDisplayName(userProfile.name)}
            </div>
            <div className="user-profile__email">
              {userProfile.email}
            </div>
          </div>
          <hr className="user-profile__divider" />
          <button 
            className="user-profile__logout"
            onClick={handleLogout}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
