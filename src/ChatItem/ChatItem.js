import React, { Component } from 'react';
import './ChatItem.css';

import Avatar from '../Avatar/Avatar';

import {
    format,
} from'timeago.js';

import classNames from 'classnames';

import { MdVideoCall, MdVolumeOff, MdVolumeUp } from 'react-icons/lib/md';

export class ChatItem extends Component {

    constructor(p) {
        super(p);
        this.state = {
            onHoverTool: false,
            onDrag: false,
        };

        this.handleOnMouseEnter = this.handleOnMouseEnter.bind(this);
        this.handleOnMouseLeave = this.handleOnMouseLeave.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    handleOnMouseEnter() {
        this.setState({
            onHoverTool: true,
        });
    }

    handleOnMouseLeave() {
        this.setState({
            onHoverTool: false,
        });
    }

    handleOnClick(e) {
        e.preventDefault();

        if (this.state.onHoverTool === true)
            return;

        this.props.onClick();
    }

    onDragOver(e) {
        e.preventDefault();
        if (this.props.onDragOver instanceof Function)
            this.props.onDragOver(e, this.props.id)
        if (!this.state.onDrag)
            this.setState({ onDrag: true })
    }


    onDragLeave (e) {
        e.preventDefault();
        if (this.props.onDragLeave instanceof Function)
            this.props.onDragLeave(e, this.props.id)
        if (this.state.onDrag)
            this.setState({ onDrag: false })
    }

    onDrop (e) {
        e.preventDefault();
        if (this.props.onDrop instanceof Function)
            this.props.onDrop(e, this.props.id)
        if (this.state.onDrag)
            this.setState({ onDrag: false })
    }

    render() {
        const statusColorType = this.props.statusColorType;

        return (
            <div
                className={classNames('rce-container-citem', this.props.className)}
                onClick={this.handleOnClick}
                onContextMenu={this.props.onContextMenu}>
                <div className="rce-citem"
                    onDragOver={this.onDragOver}
                    onDragLeave={this.onDragLeave}
                    onDrop={this.onDrop}>
                    {
                        this.state.onDrag && this.props.onDragComponent &&
                        this.props.onDragComponent(this.props.id)
                    }
                    {
                        !this.state.onDrag &&
                        [
                            <div className={classNames(
                                    "rce-citem-avatar",
                                    {
                                        'rce-citem-status-encircle': statusColorType === 'encircle',
                                    }
                                )}>
                                <Avatar
                                    src={this.props.avatar}
                                    alt={this.props.alt}
                                    className={statusColorType === 'encircle' ? 'rce-citem-avatar-encircle-status' : ''}
                                    size="large"
                                    letterItem={this.props.letterItem}
                                    sideElement={
                                        this.props.statusColor &&
                                        <span
                                            className='rce-citem-status'
                                            style={statusColorType === 'encircle' ? {
                                                border: `solid 2px ${this.props.statusColor}`
                                            } : {
                                                backgroundColor: this.props.statusColor,
                                            }}>
                                            {this.props.statusText}
                                        </span>
                                    }
                                    onError={this.props.onAvatarError}
                                    lazyLoadingImage={this.props.lazyLoadingImage}
                                    type={classNames('circle', {'flexible': this.props.avatarFlexible})}/>
                            </div>
                            ,
                            <div className="rce-citem-body">
                                <div className="rce-citem-body--top">
                                    <div className="rce-citem-body--top-title">
                                        {this.props.title}
                                    </div>
                                    <div className="rce-citem-body--top-time">
                                        {
                                            this.props.date &&
                                            !isNaN(this.props.date) &&
                                            (
                                                this.props.dateString ||
                                                format(this.props.date)
                                            )
                                        }
                                    </div>
                                </div>

                                <div className="rce-citem-body--bottom">
                                    <div className="rce-citem-body--bottom-title">
                                        {this.props.subtitle}
                                    </div>
                                    <div className="rce-citem-body--bottom-tools" onMouseEnter={this.handleOnMouseEnter} onMouseLeave={this.handleOnMouseLeave}>
                                        {
                                            this.props.showMute &&
                                            <div className="rce-citem-body--bottom-tools-item"
                                                onClick={this.props.onClickMute}>
                                                {
                                                    this.props.muted === true &&
                                                    <MdVolumeOff />
                                                }
                                                {
                                                    this.props.muted === false &&
                                                    <MdVolumeUp />
                                                }
                                            </div>
                                        }
                                        {
                                            this.props.showVideoCall &&
                                            <div className="rce-citem-body--bottom-tools-item"
                                                onClick={this.props.onClickVideoCall}>
                                                <MdVideoCall />
                                            </div>
                                        }
                                    </div>
                                    <div className="rce-citem-body--bottom-tools-item-hidden-hover">
                                        {
                                            this.props.showMute &&
                                            this.props.muted &&
                                            <div className="rce-citem-body--bottom-tools-item">
                                                <MdVolumeOff />
                                            </div>
                                        }
                                    </div>
                                    <div className="rce-citem-body--bottom-status">
                                        {
                                            this.props.unread > 0 &&
                                            <span>{this.props.unread}</span>
                                        }
                                    </div>
                                </div>
                            </div>
                        ]
                    }

                </div>
            </div>
        );
    }
}

ChatItem.defaultProps = {
    id: '',
    onClick: null,
    avatar: '',
    avatarFlexible: false,
    alt: '',
    title: '',
    subtitle: '',
    date: new Date(),
    unread: 0,
    statusColor: null,
    statusColorType: 'badge',
    statusText: null,
    dateString: null,
    lazyLoadingImage: undefined,
    onAvatarError: () => void(0),
    showMute: null,
    showVideoCall: null,
    onDrop: () => void(0),
    onDragOver: () => void(0),
    onDragLeave: () => void(0),
    onDragComponent: null
}

export default ChatItem;
