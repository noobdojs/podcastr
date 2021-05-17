import { createContext, useContext, useState, ReactNode } from 'react'

type Episode = {
  title: string
  members: string
  thumbnail: string
  duration: number
  url: string
}

type PlayerContextData = {
  episodeList: Array<Episode>
  currentEpisodeIndex: number
  isPlaying: boolean
  hasPrevious: boolean
  hasNext: boolean
  isLooping: boolean
  isShuffling: boolean
  play: (episode: Episode) => void
  togglePlay: () => void
  toggleLoop: () => void
  toggleShuffle: () => void
  playNext: () => void
  playPrevious: () => void
  setPlayingState: (state: boolean) => void
  clearPlayerState: () => void
  playList: (list: Episode[], index: number) => void
}

type PlayerContextProviderProps ={
  children: ReactNode
}

export const PlayerContext = createContext({} as PlayerContextData)

export function PlayerContextProvider({ children }: PlayerContextProviderProps){
  const [ episodeList, setEpisodeList ] = useState([])
  const [ currentEpisodeIndex, setCurrentEpisodeIndex ] = useState(0)
  const [ isPlaying, setIsPlaying ] = useState(false)
  const [ isLooping, setIsLooping ] = useState(false)
  const [ isShuffling, setIsShuffling ] = useState(false)

  const hasPrevious = currentEpisodeIndex > 0
  const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length

  function play(episode){
    setEpisodeList([episode])
    setCurrentEpisodeIndex(0)
    setIsPlaying(true)
  }

  function playList(list: Episode[], index: number){
    setEpisodeList(list)
    setCurrentEpisodeIndex(index)
    setIsPlaying(true)
  }

  function togglePlay(){
    setIsPlaying(!isPlaying)
  }

  function toggleLoop(){
    setIsLooping(!isLooping)
  }

  function toggleShuffle(){
    setIsShuffling(!isShuffling)
  }

  function setPlayingState(state: boolean){
    setIsPlaying(state)
  }

  function clearPlayerState(){
    setEpisodeList([])
    setCurrentEpisodeIndex(0)
  }

  function playNext(){
    if(isShuffling){
      const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)

      setCurrentEpisodeIndex(nextRandomEpisodeIndex)
    } else if(hasNext){
      setCurrentEpisodeIndex(currentEpisodeIndex + 1)
    }
  }

  function playPrevious(){PlayerContext
    if(hasPrevious)
      setCurrentEpisodeIndex(currentEpisodeIndex - 1)
  }

  return(
    <PlayerContext.Provider
      value={{
        episodeList, currentEpisodeIndex,
          isPlaying,
          isLooping,
          isShuffling,
          play, togglePlay,
          toggleLoop,
          toggleShuffle,
          playNext, playPrevious,
          setPlayingState,
          clearPlayerState,
          playList,
          hasPrevious, hasNext
      }}>
        {children}
      </PlayerContext.Provider>
  )
}

export const usePlayer = () => {
  return useContext(PlayerContext)
}
