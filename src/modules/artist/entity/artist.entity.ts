import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ArtistStatus } from '../types/artist.type';
import { Track } from 'src/modules/track/entity/track.entity';
import { Album } from 'src/modules/album/entity/album.entity';

@Entity()
export class Artist {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, unique: true })
    name?: string;

    @Column({ nullable: true })
    imgUrl: string

    @Column({ nullable: true })
    coverUrl: string

    @Column({ unique: true })
    slug: string

    @OneToMany(() => Track, (track) => track.artist, { onDelete: 'CASCADE', cascade: true })
    tracks: Track[]

    @OneToMany(() => Album, (album) => album.artist, { onDelete: 'CASCADE' })
    album: Album

    @Column()
    albumId: number

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({
        type: 'enum',
        enum: ArtistStatus,
        default: ArtistStatus.PENDING, // You can set a default status if needed
    })
    status: ArtistStatus;
}