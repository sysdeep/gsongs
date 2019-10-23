# Git settings


## edit config

    git config -e                   # open repo config file in editor
    git config -e --global          # open global config file in editor

## my settings

    [user]
        name = username
        email = username@mail.com
    
    [alias]
        co = checkout
        ci = commit
        st = status
        br = branch
        hist = log --pretty=format:\"%h %ad | %s%d [%an]\" --graph --date=short
        type = cat-file -t
        dump = cat-file -p
    
    [core]
        quotepath = false 
        pager = cat|more.com
    
    [color]
        ui = auto
    
    [color "branch"]
        current = yellow reverse
        local = yellow
        remote = green
    
    [color "diff"]
        meta = yellow bold
        frag = magenta bold
        old = red bold
        new = green bold
    
    [color "status"]
        added = yellow
        changed = green
        untracked = cyan


## Tags

    git tag                         # all tags
    git tag v1.2.1                  # create tag
    git push origin master --tags   # push tags to server