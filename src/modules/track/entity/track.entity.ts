import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Artist } from 'src/modules/artist/entity/artist.entity';
import { TrackStatus } from '../types/track.type';
import { Album } from 'src/modules/album/entity/album.entity';

@Entity()
export class Track {
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

    @Column({ nullable: true })
    duration: number

    @ManyToOne(() => Artist, (artist) => artist.tracks, { onDelete: 'CASCADE' })
    artist: Artist

    @Column()
    artistId: number

    @ManyToOne(() => Album, (album) => album.trackAlbums, { onDelete: 'CASCADE' })
    album: Album

    @Column()
    albumId: number




    @Column()
    releaseDate: Date

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({
        type: 'enum',
        enum: TrackStatus,
        default: TrackStatus.PENDING
    })
    status: TrackStatus;
}